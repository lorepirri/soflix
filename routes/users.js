var express = require('express');
var router = express.Router();

// Require controller modules.
var userController = require('../controllers/userController');

/// USERS ROUTES ///

// GET request for list of all Users.
router.get('/', userController.user_list);

// GET request for one User.
router.get('/:Username', userController.user_get);

// POST request for creating User.
router.post('/', userController.user_create);

// POST request to update User.
router.put('/:Username', userController.user_update);

// DELETE request to delete User.
router.delete('/:Username', userController.user_delete);

// POST request to add a favorite Movie to a User.
router.post('/:Username/:MovieID', userController.user_add_favorite_movie);

// DELETE request to remove a favorite Movie to a User.
router.delete('/:Username/:MovieID', userController.user_remove_favorite_movie);

module.exports = router;