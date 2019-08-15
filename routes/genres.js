var express = require('express');
var router = express.Router();

// Require controller modules.
var genreController = require('../controllers/genreController');

/// GENRES ROUTES ///

// GET request for list of all Genres.
router.get('/', genreController.genres_list);

// GET request for a single Genre, by Name
router.get('/:Name', genreController.genre_get);

module.exports = router;