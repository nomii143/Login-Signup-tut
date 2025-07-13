const express = require('express');
const path = require('path');
const session = require('express-session');
const { connectDB } = require('../config/db');
const authRoutes = require('../routes/authRoutes');
require('dotenv').config();

const app = express();

// Connect DB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(session({
  secret: 'yourSecretKey',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }
}));

// Views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));

// Routes
app.use('/', authRoutes);

module.exports = app; // ✅ Required by Vercel
