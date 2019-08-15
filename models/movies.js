const mongoose = require('mongoose');

var movieSchema = mongoose.Schema({
  Title: {type: String, required: true},
  Description: {type: String, required: true},
  Genre: {type: mongoose.Schema.Types.ObjectId, ref: 'Genre' },
  Director: {type: mongoose.Schema.Types.ObjectId, ref: 'Director' },
  ImageUrl: String,
  Actors: [{type: mongoose.Schema.Types.ObjectId, ref: 'Actor' }],
  Featured: Boolean
});

module.exports = mongoose.model('Movie', movieSchema);
