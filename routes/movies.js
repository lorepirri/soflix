var express = require('express');
var router = express.Router();

// Require controller modules.
var movieController = require('../controllers/movieController');

/// MOVIES ROUTES ///

// GET request for list of all Movies.
router.get('/', movieController.movies_list);

// GET request for a single Movie, by title
router.get('/:Title', movieController.movie_get);

module.exports = router;