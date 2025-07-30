// routes/uploadRoutes.js
const express = require('express');
const upload = require('../middlewares/uploadMiddleware');
const router = express.Router();

router.post('/image', upload.single('image'), (req, res) => {
  // File saved, return its path
  res.json({ imageUrl: `/uploads/${req.file.filename}` });
});
