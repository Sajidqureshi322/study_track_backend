const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["MCQ", "CODING"],
      required: true
    },
    category: {
      type: String
    },
    problem: {
      type: String,
      required: true
    },
    options: {
      type: [String], // only for MCQ
      default: []
    },
    answer: {
      type: String
    },
    difficulty: {
      type: String,
      enum: ["EASY", "MEDIUM", "HARD"]
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Question", questionSchema);
