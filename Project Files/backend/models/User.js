// backend/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone: String,
  type: {
    type: String,
    enum: ['user', 'admin', 'doctor'],
    default: 'user'
  }
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
