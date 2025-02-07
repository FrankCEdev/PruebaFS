const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getAllCategories,
  getRecommendations
} = require('../controllers/categoryController');

router.get('/all', protect, getAllCategories);
router.get('/recommendations', protect, getRecommendations);

module.exports = router;