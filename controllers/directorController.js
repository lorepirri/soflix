const Directors = require('../models/directors');

// Get all directors
module.exports.directors_list = function(req, res) {
  Directors.find()
    .then( directors => {
      res.status(201).json(directors);
    })
    .catch( error => {
      console.error(error);
      res.status(500).send(`Error <${error}>`);
    });
};

// Get a director by Name
module.exports.director_get = function(req, res) {
  let { Name } = req.params;
  Directors.findOne({ Name: {$regex: `${Name}.*`, $options: 'i'} })
    .populate('Actors')
    .then( director => {
      if (director) {
        res.json(director);
      } else {
        res.status(404).send(`Director <${Name}> not found.`);
      }
    })
    .catch( err => {
      console.error(err);
      res.status(500).send(`Error <${err}>`);
    });  
};
