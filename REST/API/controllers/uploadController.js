const { admin } = require('../db'); 
const bucket = admin.storage().bucket(process.env.STORAGE_BUCKET);//acesarea serv. de stocare

const uploadImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).send('Nu a fost încărcat niciun fișier.');
    }

    const fileName = `${Date.now()}_${req.file.originalname}`;//generare nume unic
    const blob = bucket.file(fileName);//creare referință catre fișier in firebase

    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: req.file.mimetype
      }
    });

    blobStream.on('error', (err) => {
      console.error(err);
      next(err);
    });

    blobStream.on('finish', async () => {
      try {
        await blob.makePublic(); 
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
        res.status(200).json({ 
            message: 'Imagine încărcată cu succes!',
            imageUrl: publicUrl 
        });
      } catch (error) {
         next(error);
      }
    });
    blobStream.end(req.file.buffer);

  } catch (error) {
    next(error);
  }
};

module.exports = { uploadImage };