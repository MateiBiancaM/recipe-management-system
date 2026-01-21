const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadImage } = require('../controllers/uploadController');
const checkAuth = require('../middleware/checkAuth');

const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // Limită: 5MB
  }
});

router.post('/', checkAuth, upload.single('image'), uploadImage);

module.exports = router;