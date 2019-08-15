const mongoose = require('mongoose');

var movieSchema = mongoose.Schema({
  Title: {type: String, required: true},
  Description: {type: String, required: true},
  Genre: {
    Name: {type: String, required: true},
    Description: {type: String, required: true}
  },
  Director: {
    Name: {type: String, required: true},
    Bio: {type: String, required: true},
    Birthyear: Date,
    Deathyear: Date
  },
  ImageUrl: String,
  Actors: [{type: mongoose.Schema.Types.ObjectId, ref: 'Actor' }],
  Featured: Boolean
});

module.exports = mongoose.model('Movie', movieSchema);
