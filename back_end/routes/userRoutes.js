const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const multer = require('multer');
const {
  verifyPhone,
  verifyOTP,
  updateUser,
  getUserInfo,
  updateUserCategories
} = require('../Controllers/userController');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

router.post('/verify/phone', verifyPhone);
router.post('/verify/otp', verifyOTP);
router.put('/update', protect, upload.single('profileImage'), updateUser);
router.get('/info', protect, getUserInfo);
router.put('/categories', protect, updateUserCategories);

module.exports = router;
