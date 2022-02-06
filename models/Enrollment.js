const mongoose = require("mongoose")

const EnrollmentSchema= mongoose.Schema({
    quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quiz"
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student"
    },
    attempt: {
        type: Boolean,
        default: false,
    },
    date_attempted: Date
})

module.exports = mongoose.model("Enrollment",EnrollmentSchema)
