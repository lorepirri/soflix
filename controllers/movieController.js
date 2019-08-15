const Movies = require('../models/movies');
// this is just included to trigger registering the Actors schema
const Actors = require('../models/actors');

// Get all movies
module.exports.movies_list = function(req, res) {
  Movies.find()
    .populate('Actors')
    .populate('Genre')
    .populate('Director')
    .then( movies => {
      res.status(201).json(movies);
    })
    .catch( error => {
      console.error(error);
      res.status(500).send(`Error <${error}>`);
    });
};

// Get a movie by Title
module.exports.movie_get = function(req, res) {
  let { Title } = req.params;
  Movies.findOne({ Title: {$regex: `${Title}.*`, $options: 'i'} })
    .populate('Actors')
    .populate('Genre')
    .populate('Director')
    .then( movie => {
      if (movie) {
        res.json(movie);
      } else {
        res.status(404).send(`Movie <${Title}> not found.`);
      }
    })
    .catch( err => {
      console.error(err);
      res.status(500).send(`Error <${err}>`);
    });  
};
