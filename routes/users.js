var express = require('express');
var router = express.Router();

// Require controller modules.
var userController = require('../controllers/userController');

/// USERS ROUTES ///

// GET request for list of all Users.
router.get('/', authorizeAdmin, userController.user_list);

// GET request for one User.
router.get('/:Username', authorize, userController.user_get);

// POST request for creating User (public).
router.post('/', userController.user_create);

// POST request to update User.
router.put('/:Username', authorize, userController.user_update);

// DELETE request to delete User.
router.delete('/:Username', authorize, userController.user_delete);

// POST request to add a favorite Movie to a User.
router.post('/:Username/:MovieID', authorize, userController.user_add_favorite_movie);

// DELETE request to remove a favorite Movie to a User.
router.delete('/:Username/:MovieID', authorize, userController.user_remove_favorite_movie);

function authorizeAdmin(req, res, next) {
  let authenticatedUsername = req.user.Username;
  // authorize based on Username 'admin' (to keep it simple it's hardcoded)
  if (authenticatedUsername !== 'admin') {
    // the user is neither the logged in one, neither the admin
    return res.status(401).send(`Forbidden operation for user <${authenticatedUsername}>.`);
  } 
  // authorization successful
  next();  
}

function authorize(req, res, next) {
  let { Username } = req.params;
  let authenticatedUsername = req.user.Username;
  // authorize based on Username 'admin' or same authenticated Username and Username
  if (authenticatedUsername !== 'admin' 
      && authenticatedUsername !== Username) {
    // the user is neither the logged in one, neither the admin
    return res.status(401).send(`Forbidden operation on user <${Username}> for user <${authenticatedUsername}>.`);
  } 
  // authorization successful
  next();  
}

module.exports = router;