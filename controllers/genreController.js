const Genres = require('../models/genres');

// Get all genres
module.exports.genres_list = function(req, res) {
  Genres.find()
    .then( genres => {
      res.status(201).json(genres);
    })
    .catch( error => {
      console.error(error);
      res.status(500).send(`Error <${error}>`);
    });
};

// Get a genre by Name
module.exports.genre_get = function(req, res) {
  let { Name } = req.params;
  Genres.findOne({ Name: {$regex: `${Name}.*`, $options: 'i'} })
    .populate('Actors')
    .then( genre => {
      if (genre) {
        res.json(genre);
      } else {
        res.status(404).send(`Genre <${Name}> not found.`);
      }
    })
    .catch( err => {
      console.error(err);
      res.status(500).send(`Error <${err}>`);
    });  
};
