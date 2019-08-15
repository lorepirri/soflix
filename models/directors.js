const mongoose = require('mongoose');

let directorSchema = mongoose.Schema({
  Name: {type: String, required: true},
  Bio: {type: String, required: true},
  Birthyear: Date,
  Deathyear: Date
});

module.exports = mongoose.model('Director', directorSchema);