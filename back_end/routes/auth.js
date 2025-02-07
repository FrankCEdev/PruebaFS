const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

router.post('/verify/phone', (req, res) => {
  const { phone } = req.body;
  res.status(200).json({ message: 'OTP sent', otp: '0000' });
});

router.post('/verify/otp', async (req, res) => {
  const { phone, otp } = req.body;
  if (otp !== '0000') {
    return res.status(400).json({ message: 'Invalid OTP' });
  }

  let user = await User.findOne({ phone });
  if (!user) {
    user = new User({ phone });
    await user.save();
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.status(200).json({ token });
});

module.exports = router;