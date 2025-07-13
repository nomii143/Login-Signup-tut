const mongoose = require('mongoose');
const User = require('../models/User');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/Login-Signup-tut');
    console.log('MongoDB connected to Login-Signup-tut');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
};

module.exports = { connectDB, User };
