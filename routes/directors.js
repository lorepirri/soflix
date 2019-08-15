var express = require('express');
var router = express.Router();

// Require controller modules.
var directorController = require('../controllers/directorController');

/// GENRES ROUTES ///

// GET request for list of all Directors.
router.get('/', directorController.directors_list);

// GET request for a single Director, by Name
router.get('/:Name', directorController.director_get);

module.exports = router;