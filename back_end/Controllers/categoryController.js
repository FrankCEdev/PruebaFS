const Category = require('../models/Category');

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    
    res.status(200).json({
      success: true,
      data: categories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getRecommendations = async (req, res) => {
  try {
    const { categories } = req.query;
    const categoryArray = categories ? categories.split(',') : [];
    
    // Mock recommendations based on categories
    const recommendations = [
      {
        id: 1,
        name: 'Beach Resort',
        description: 'Beautiful beach resort with amazing views',
        image: 'beach.jpg',
        rating: 4.5,
        category: 'Beach'
      },
      // Add more mock recommendations
    ];
    
    res.status(200).json({
      success: true,
      data: recommendations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
