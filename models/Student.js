const mongoose = require("mongoose");

const StudentSchema = mongoose.Schema({
  name: String,
  studentId: {
    type: String,
    index: true,
    unique: true,
  },
  email: {
    type: String,
    index: true,
    unique: true,
  },
  password: String,
  date_create: {
    type: Date,
    default: Date.now(),
  }
});

module.exports = mongoose.model("Student", StudentSchema);
