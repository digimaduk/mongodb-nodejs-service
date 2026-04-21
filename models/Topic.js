const mongoose = require("mongoose");

const factSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true
  },
  reference: {
    type: String,
    default: ""
  }
});

const subtopicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  facts: {
    type: [factSchema],
    default: []
  }
});

const topicSchema = new mongoose.Schema(
  {
    topic: {
      type: String,
      required: true,
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    subtopics: {
      type: [subtopicSchema],
      default: []
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Topic", topicSchema);