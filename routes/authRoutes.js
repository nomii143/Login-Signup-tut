const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Routes
router.get('/', authController.renderLogin);
router.get('/signup', authController.renderSignup);
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/admin', authController.adminDashboard);
router.get('/user', authController.userDashboard);
router.get('/logout', authController.logout);

module.exports = router;
