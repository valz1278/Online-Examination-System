const Enrollment = require("../../models/Enrollment");
const Student = require("../../models/Student");

const { sanitizeQuizForStudent } = require("../../utils/sanitize");

exports.getEnrollment = async (studentid) => {
  const enrollments = await Enrollment.find({ student: studentid }).populate(
    "quiz"
  );
  const result = [];
  if (result) {
    enrollments.forEach((enrollment) => {
      enrollment.questions = sanitizeQuizForStudent(enrollment.questions);
      result.push(enrollment);
    });
  }
  return result;
};

exports.getStudentEnrollmentList = async (quizid) => {
  const result = await Enrollment.find({ quiz: quizid }).populate("student");
  return result;
};

exports.addEnrollment = async (quizid, studentId) => {
  const student = await Student.findOne({ studentId: studentId }, { _id: true });

  if (student._id) {
    const exist = await Enrollment.findOne(
      { quiz: quizid },
      { student: student._id }
    );
    if (!exist) {
      await Enrollment.create({
        quiz: quizid,
        student: student._id,
        attempt: 0,
      });
    }
    else{
      return 'Student is already enrolled in that quiz'
    }
  }
};

exports.deleteEnrollment = async (quizid, studentId) => {
  const student = await Student.findOne({ studentId: studentId }, { _id: true });
  if (student._id)
    await Enrollment.deleteOne({ quiz: quizid, student: student._id });
};