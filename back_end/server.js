const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.config({ path: './config/config.env' });
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/v1/user', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/category', categoryRoutes);

// Database connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));