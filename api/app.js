const express = require('express');
const path = require('path');
const session = require('express-session');
const { connectDB } = require('../config/db');
const authRoutes = require('../routes/authRoutes');

const app = express();

// Connect to DB
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

// Set views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views')); // Important fix

// Routes
app.use('/', authRoutes);

// Export app for Vercel
module.exports = app;
