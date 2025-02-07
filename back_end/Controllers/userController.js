const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

exports.verifyPhone = async (req, res) => {
  try {
    const { phone } = req.body;
    
    // Check if user exists
    let user = await User.findOne({ phone });
    const isNewUser = !user;
    
    if (!user) {
      user = await User.create({ phone });
    }
    
    // In a real app, here we would need to send the OTP to the user's phone
    // For this test, I'll just return success
    
    res.status(200).json({
      success: true,
      isNewUser,
      message: 'OTP sent successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    const { phone, otp } = req.body;
    
    // Mock OTP verification - always verify '0000'
    if (otp !== '0000') {
      return res.status(400).json({
        success: false,
        message: 'Invalid OTP'
      });
    }
    
    const user = await User.findOne({ phone });
    const token = generateToken(user._id);
    
    res.status(200).json({
      success: true,
      token,
      isProfileComplete: !!(user.name && user.lastName)
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { name, lastName, email } = req.body;
    const profileImage = req.file ? req.file.filename : null;
    
    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        name,
        lastName,
        email,
        ...(profileImage && { profileImage })
      },
      { new: true }
    );
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('selectedCategories');
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.updateUserCategories = async (req, res) => {
  try {
    const { categories } = req.body;
    
    if (categories.length > 5) {
      return res.status(400).json({
        success: false,
        message: 'Maximum 5 categories allowed'
      });
    }
    
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { selectedCategories: categories },
      { new: true }
    ).populate('selectedCategories');
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};