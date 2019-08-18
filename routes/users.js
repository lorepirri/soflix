/// USERS ROUTES ///
// wrapped in a func to use same instance of passoport as index.js
module.exports = function(app, passport) {
  var express = require('express');
  var router = express.Router();
  
  // let router = app.Router();
  
  // Require controller modules.
  let userController = require('../controllers/userController');

  // POST request for creating User (public).
  router.post('/', userController.user_create);

  // GET request for list of all Users.
  router.get('/', passport.authenticate('jwt', { session: false }), authorizeAdmin, userController.user_list);

  // GET request for one User.
  router.get('/:Username', passport.authenticate('jwt', { session: false }), authorize, userController.user_get);


  // POST request to update User.
  router.put('/:Username', passport.authenticate('jwt', { session: false }), authorize, userController.user_update);

  // DELETE request to delete User.
  router.delete('/:Username', passport.authenticate('jwt', { session: false }), authorize, userController.user_delete);

  // POST request to add a favorite Movie to a User.
  router.post('/:Username/:MovieID', passport.authenticate('jwt', { session: false }), authorize, userController.user_add_favorite_movie);

  // DELETE request to remove a favorite Movie to a User.
  router.delete('/:Username/:MovieID', passport.authenticate('jwt', { session: false }), authorize, userController.user_remove_favorite_movie);

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

  return router;
};