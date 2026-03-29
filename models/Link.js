const mongoose = require("mongoose");

const linkSchema = new mongoose.Schema({
    category: String,
    name: String,
    url: String
});

module.exports = mongoose.model("Link", linkSchema);
