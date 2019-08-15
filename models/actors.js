const mongoose = require('mongoose');

var actorSchema = mongoose.Schema({
  Name: {type: String, required: true},
  Bio: {type: String, required: true},
  Birthyear: Date
});

module.exports = mongoose.model('Actor', actorSchema);
