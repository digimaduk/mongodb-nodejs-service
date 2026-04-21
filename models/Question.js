const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true
    },
    answers: {
      type: [String], // array of 4 answers
      required: true
    },
    correctAnswer: {
      type: Number, // index of correct answer (0–3)
      required: true,
      min: 0,
      max: 3
    },
    explanation: {
      type: String,
      default: ""
    },
    reference: {
      type: String, // e.g., "Chapter 2 – UK History"
      default: ""
    },
    category: {
      type: String,
      required: true,
      enum: [
        "British Values",
        "UK History",
        "Government & Law",
        "Everyday Life",
        "Other"
      ],
    },
    test: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Question", questionSchema);