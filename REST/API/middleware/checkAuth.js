const { admin } = require('../db');

const checkAuth = async (req, res, next) => {
  try {
    const tokenHeader = req.headers.authorization;//preluam token-ul din header

    if (!tokenHeader) {
      return res.status(401).json({ message: 'Autentificarea este necesară ' });
    }

    const token = tokenHeader.split(' ')[1];
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;

    next();
  } catch (error) {
    console.error('Eroare autentificare:', error);
    return res.status(403).json({ message: 'Token invalid sau expirat' });
  }
};

module.exports = checkAuth;