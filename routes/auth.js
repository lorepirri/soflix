var express = require('express');
var router = express.Router();

// Require controller modules.
var authController = require('../controllers/authController');

/// AUTH ROUTES ///

// POST for login.
router.post('/', authController.auth);

module.exports = router;