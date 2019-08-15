const mongoose = require('mongoose');

let genreSchema = mongoose.Schema({
  Name: {type: String, required: true},
  Description: {type: String, required: true}
});

module.exports = mongoose.model('Genre', genreSchema);