const Users = require('../models/users');

// Get all users
module.exports.user_list = function(req, res) {
  Users.find()
    .then( users => {
      res.status(201).json(users);
    })
    .catch( error => {
      console.error(error);
      res.status(500).send(`Error <${error}>`);
    });
};

// Get a user by Username
module.exports.user_get = function(req, res) {
  let { Username } = req.params;
  Users.findOne({ Username })
    .populate('FavoriteMovies')
    .exec( (err, user) => {
      if (err) {
        console.error(err);
        res.status(500).send(`Error <${err}>`);
      }      
      else if (user) {
        res.json(user);
      } else {
        res.status(404).send(`User ${Username} not found.`);
      }
    });
};

// Adds data for a new user to the list of Users.
/* We’ll expect JSON in this format
{
  Name: String,
  (required)
  Username: String,
  (required)
  Password: String,
  (required)
  Email: String,
  (required)
  Birthday: Date
}*/
module.exports.user_create = (req, res) => {
  let { Name, Username, Password, Email, Birthday } = req.body;
  Users.findOne({ Username })
    .then( user => {
      if (user) {
        return res.status(400).send(`User ${Username} already exists.`);
      } else {
        Users.create({
          Name,
          Username,
          Password,
          Email,
          Birthday
        })
          .then( user => {res.status(201).json(user);})
          .catch( error => {
            console.error(error);
            res.status(500).send(`Error <${error}>.`);
          });
      }
    })
    .catch( error => {
      console.error(error);
      res.status(500).send(`Error <${error}>.`);
    });
};

// Update a user's info, by username
/* We’ll expect JSON in this format
{
  Name: String,
  (required)
  Username: String,
  (required)
  Password: String,
  (required)
  Email: String,
  (required)
  Birthday: Date
}*/
module.exports.user_update = (req, res) => {
  let { Name, Username, Password, Email, Birthday } = req.body;
  Users.findOneAndUpdate(
    { Username: req.params.Username }, 
    { $set: {
      Name,
      Username,
      Password,
      Email,
      Birthday
    }},
    { new: true}) // pass the updated document to the callback
    .then( updatedUser => {
      // return the updated user
      res.json(updatedUser);
    })
    .catch( err => {
      console.error(err);
      res.status(500).send(`Error ${err}`);
    });
};
  
// Delete user by Username
module.exports.user_delete = (req, res) => {
  let { Username } = req.params;
  Users.findOneAndRemove({ Username })
    .then( user => {
      if (user) {
        res.status(201).send(`${Username} was deleted.`);
      } else {
        res.status(404).send(`${Username} was not found.`);
      }
    })
    .catch( err => {
      console.error(err);
      res.status(500).send(`Error <${err}>.`);
    });
};

// Add a favorite Movie to a User.
module.exports.user_add_favorite_movie = (req, res) => {
  let { Username, MovieID } = req.params;
  Users.findOneAndUpdate({ Username }, {
    $push : { FavoriteMovies : MovieID }
  },
  { new : true }) // Pass the updated document to the callback
    .then( updatedUser => {
      res.json(updatedUser);
    })
    .catch( err => {
      console.error(err);
      res.status(500).send(`Error: <${err}>.`);
    });
};

// Remove a favorite Movie to a User.
module.exports.user_remove_favorite_movie = (req, res) => {
  let { Username, MovieID } = req.params;
  Users.findOneAndUpdate({ Username }, {
    $pull : { FavoriteMovies : MovieID }
  },
  { new : true }) // Pass the updated document to the callback
    .then( updatedUser => {
      res.json(updatedUser);
    })
    .catch( err => {
      console.error(err);
      res.status(500).send(`Error: <${err}>.`);
    });
};
