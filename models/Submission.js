const mongoose = require("mongoose");

const SubmissionSchema = mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
  },
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
  },
  final_score: Number,
  answers: [
    {
      questionid: mongoose.Schema.Types.ObjectId,
      actual_answer: String,
      student_answer: String,
      score: Number,
      final: Boolean,
    },
  ],
  date_submit: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Submission", SubmissionSchema);
