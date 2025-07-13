const bcrypt = require('bcrypt');
const { User } = require('../config/db');

// Render pages
exports.renderLogin = (req, res) => {
  res.render('login', { signupSuccess: req.query.signupSuccess, error: req.query.error });
};

exports.renderSignup = (req, res) => {
  res.render('signup', { error: req.query.error });
};

// Signup logic
exports.signup = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const existingUser = await User.findOne({ username });

    if (existingUser) return res.redirect('/signup?error=Username+already+exists');

    const newUser = new User({ username, password, role: role || 'user' });
    await newUser.save();

    res.redirect('/?signupSuccess=true');
  } catch (err) {
    console.error('Signup Error:', err);
    res.redirect('/signup?error=Registration+failed');
  }
};

// Login logic
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.redirect('/?error=Invalid+Username or Password');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.redirect('/?error=Invalid+credentials');

    req.session.user = { id: user._id, username: user.username, role: user.role };

    res.redirect(user.role === 'admin' ? '/admin' : '/user');
  } catch (err) {
    console.error('Login Error:', err);
    res.redirect('/?error=Login+failed');
  }
};

// Dashboards
exports.adminDashboard = (req, res) => {
  if (!req.session.user || req.session.user.role !== 'admin') {
    return res.redirect('/?error=Admin+access+required');
  }
  res.render('admin', { user: req.session.user });
};

exports.userDashboard = (req, res) => {
  if (!req.session.user) {
    return res.redirect('/?error=Please+login');
  }
  res.render('user', { user: req.session.user });
};

// Logout
exports.logout = (req, res) => {
  req.session.destroy(err => {
    if (err) console.error('Logout Error:', err);
    res.redirect('/');
  });
};
