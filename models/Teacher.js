const mongoose = require("mongoose");

const TeacherSchema = mongoose.Schema({
  name: String,
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

module.exports = mongoose.model("Teacher", TeacherSchema);
