const mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  Name: {type: String, required: true},
  Username: {type: String, required: true},
  Password: {type: String, required: true},
  Email: {type: String, required: true},
  Birthday: Date,
  FavoriteMovies: [{type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }]
});

module.exports = mongoose.model('User', userSchema);
