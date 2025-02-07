const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  phone: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String },
  profilePicture: { type: String },
  categories: [{ type: String }],
});

module.exports = mongoose.model('User', userSchema);