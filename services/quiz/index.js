const Quiz = require("../../models/Quiz");
const Enrollment = require("../../models/Enrollment");
const Submission = require("../../models/Submission");
const Student = require("../../models/Student");
const { sanitizeQuizForStudent } = require("../../utils/sanitize");

const fetchQuiz = (quizId) => {
  return Quiz.findOne({ _id: quizId });
};

exports.getAllQuiz = () => {
  return Quiz.find();
};

exports.getAllQuizForTeacher = (teacherId) => {
  return Quiz.find({ teacher: teacherId });
};

exports.getQuizForTeacher = (quizId) => {
  return fetchQuiz(quizId);
};

exports.getQuiz = async (quizId, studentid) => {
  const result = await Enrollment.findOne({
    quiz: quizId,
    student: studentid,
  }).populate("quiz");
  if (result)
    result.quiz.questions = sanitizeQuizForStudent(result.quiz.questions);
  return result;
};

exports.createQuiz = async (data, teacherId) => {
  data.teacher = teacherId;
  await Quiz.create(data);
  return "OK";
};

exports.deleteQuiz = async (quizId) => {
  await Quiz.findOneAndRemove({ _id: quizId });
  await Enrollment.remove({ quiz: quizId });
  await Submission.remove({ quiz: quizId });
  return "OK";
};

exports.editQuiz = async (quizId, data) => {
  // let temp = await Quiz.findOne({ _id: quizId })
  // if(!temp){
  //   temp = await Quiz.create(data);
  //   return "OK";
  // } else {
  await Quiz.findByIdAndUpdate(quizId, data);
  return "OK";
  // }
};

/**
 *
 * @param {Object} submission request body of student submission
 * @param {Object} user user session data
 */
exports.submitQuiz = async (submission, studentid) => {
  const quizID = submission.quizid;
  const teacherid = submission.teacher;
  const quiz = await fetchQuiz(quizID);
  const { checkedAnswers, studentScore } = compareQuizAnswerResult(
    submission.answers,
    quiz.questions
  );
  // console.log(checkedAnswers,studentScore)
  // make a submission
  await Submission.create({
    student: studentid,
    quiz: quizID,
    answers: checkedAnswers,
    final_score: studentScore,
    teacher: teacherid,
  });
  // after submission is finish then update enrollment attempt into true
  await Enrollment.updateOne(
    { quiz: quiz._id },
    { attempt: true, date_attempted: Date.now() }
  );
  return "OK";
};

/**
 *
 * @param {Object} submissionAnswers Student submission answer as set data structure
 * @param {Array} questions List of quiz questions
 */
const compareQuizAnswerResult = (submissionAnswers = {}, questions = []) => {
  // turn array into map
  const providedAnswerMap = submissionAnswers;
  const checkedAnswers = [];
  let studentScore = 0;
  // Compare student asnwer with the real answer
  questions.forEach((question) => {
    const isCorrectAnswer =
      String(providedAnswerMap[question._id]).toLocaleLowerCase() ===
      String(question.answer).toLocaleLowerCase();
    // if correct answer use question score and if false student get 0
    const score = isCorrectAnswer ? question.score : 0;
    const checkedAnswer = {
      questionid: question._id,
      student_answer: providedAnswerMap[question._id],
      actual_answer: question.answer,
      score,
      final: isCorrectAnswer,
    };
    // sum the student score
    studentScore += score;
    // store checked answer into array
    checkedAnswers.push(checkedAnswer);
  });
  return { checkedAnswers, studentScore };
};

/**
 * change the data type of array into map for lower complexity itteration
 * @returns hash table
 */
// const mapStudentAnswer = (answers = []) => {
//   const map = {};
//   answers.forEach(({ _id, value }) => {
//     map[_id] = value;
//   });
//   return map;
// };

/**
 * @todo get submission result
 */
exports.getAllResult = (studentid) => {
  return Submission.find({ student: studentid }).populate("quiz");
};

exports.getQuizResult = async (submissionid, studentid) => {
  const result = await Submission.findOne({
    _id: submissionid,
    student: studentid,
  }).populate("quiz");
  return result;
};

exports.getAllResultForTeacher = async (teacherid) => {
  const result = await Submission.find({ teacher: teacherid }).populate("quiz").populate("student", "studentId");
  return result;
};

exports.getResultForTeacher = async (teacherid, submissionid) => {
  const result = await Submission.findOne({
    _id: submissionid,
    teacher: teacherid,
  }).populate("quiz").populate("student", "studentId");
  return result;
};
