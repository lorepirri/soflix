const { body, validationResult, sanitizeBody } = require('express-validator');
const Users = require('../models/users');

// All validation, and sanitization on User.
// Used where needed (Create/Update).
let validate_sanitize = [
  // Validate fields.
  body('Name').isLength({ min: 1 }).trim().withMessage('Name must be specified.')
    .matches(/^[a-zA-Z öäü]*$/, 'gm').withMessage('Name has invalid characters.'),
  body('Username').isLength({ min: 1 }).trim().withMessage('Username must be specified.')
    .isAlphanumeric().withMessage('Username has non-alphanumeric characters.'),
  body('Password').isLength({ min: 6 }).trim().withMessage('Password must be specified, and at least of 6 alphanumeric characters.')
    .isAlphanumeric().withMessage('Username has non-alphanumeric characters.'),
  body('Email').isLength({ min: 1 }).trim().withMessage('Email must be specified.')
    .isEmail().withMessage('Email does not appear to be valid.'),
  body('Birthday').exists({ strict: true, checkFalsy: true }).withMessage('Birthday must be specified.')
    .isISO8601().withMessage('Invalid date of birth'),
  
  // Sanitize fields.
  sanitizeBody('Name').escape(),
  sanitizeBody('Username').escape(),
  sanitizeBody('Password').escape(),
  sanitizeBody('Email').escape(),
  sanitizeBody('Birthday').toDate()
];


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
module.exports.user_create = [
  
  ...validate_sanitize,
  
  (req, res) => {

    // Extract the validation errors from a request.
    const errors = validationResult(req);
    // If there are errors, return    
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let { Name, Username, Password, Email, Birthday } = req.body;
    let hashedPassword = Users.hashPassword(Password);
    Users.findOne({ Username })
      .then( user => {
        if (user) {
          return res.status(400).send(`User ${Username} already exists.`);
        } else {
          Users.create({
            Name,
            Username,
            Password: hashedPassword,
            Email,
            Birthday
          })
            .then( user => { res.status(201).json(user); })
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
  }
];

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
module.exports.user_update = [

  ...validate_sanitize,

  (req, res) => {

    // Extract the validation errors from a request.
    const errors = validationResult(req);
    // If there are errors, return    
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let { Name, Username, Password, Email, Birthday } = req.body;
    let hashedPassword = Users.hashPassword(Password);
    Users.findOneAndUpdate(
      { Username: req.params.Username }, // this Username is from the params
      { $set: {
        Name,
        Username,
        Password: hashedPassword, // save the hashed password value
        Email,
        Birthday
      }},
      { new: true}) // pass the updated document to the callback
      .then( updatedUser => {
        if (updatedUser) {
          // return the updated user
          res.json(updatedUser);
        } else {
          return res.status(404).send(`User ${Username} not found.`);
        }
      })
      .catch( err => {
        console.error(err);
        res.status(500).send(`Error ${err}`);
      });
  }
];
  
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
    $addToSet : { FavoriteMovies : MovieID }
  },
  { new : true }) // Pass the updated document to the callback
    .then( updatedUser => {
      if (updatedUser) {
        res.json(updatedUser); // return the updated user
      } else {
        return res.status(404).send(`User ${Username} not found.`);
      }      
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
      if (updatedUser) {
        res.json(updatedUser); // return the updated user
      } else {
        return res.status(404).send(`User ${Username} not found.`);
      }   
    })
    .catch( err => {
      console.error(err);
      res.status(500).send(`Error: <${err}>.`);
    });
};
