const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema({
  name: String,
  quiz_duration: Number,
  start_date: Date,
  end_date: Date,
  date_create: {
    type: Date,
    default: Date.now(),
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher"
  },
  questions: [
    {
      question: String,
      type: {
        type: String,
        enum: ["mcq", "tof"],
        default: "mcq",
      },
      answer: String,
      score: Number,
      choices: [
        {
          label: String,
          value: String,
        },
      ],
    },
  ],
});

module.exports = mongoose.model("Quiz", QuizSchema);

