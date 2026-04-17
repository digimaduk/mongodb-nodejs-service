const mongoose = require('mongoose');

const factSchema = new mongoose.Schema({
  title: String,
  fact: String,
  year: String,
  type: String
});

module.exports = mongoose.model('Fact', factSchema);