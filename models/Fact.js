const mongoose = require('mongoose');

const factSchema = new mongoose.Schema({
  title: String,
  facts: [String],
  year: String,
  type: String,
  century: String,
  party: String,
  index: Number,
  imgPath: String,
  index: Number
});

module.exports = mongoose.model('Fact', factSchema);