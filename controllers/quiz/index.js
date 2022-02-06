const quiz = require("../../services/quiz");

exports.getAllQuiz = async (req, res, next) => {
  try {
    // console.log(req.user)
    const result = await quiz.getAllQuiz();
    res.send(result);
  } catch (err) {
    next(err);
  }
};

exports.getAllQuizForTeacher = async (req, res, next) => {
  try {
    const teacherId = req.user._id;
    const result = await quiz.getAllQuizForTeacher(teacherId);
    res.send(result);
  } catch (err) {
    next(err);
  }
}

exports.getQuiz = async (req, res, next) => {
  try {
    const id = req.params.id;
    const studentid = req.user._id;
    const result = await quiz.getQuiz(id, studentid);
    res.send(result);
  } catch (err) {
    next(err);
  }
};

exports.submitQuiz = async (req, res, next) => {
  try {
    const studentid = req.user._id;
    const data = req.body;
    await quiz.submitQuiz(data, studentid);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

exports.getQuizForTeacher = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await quiz.getQuizForTeacher(id);
    res.send(result);
  } catch (err) {
    next(err);
  }
};

exports.createQuiz = async (req, res, next) => {
  try {
    const data = req.body;
    const teacherId = req.user._id;
    await quiz.createQuiz(data, teacherId);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

exports.editQuiz = async (req, res, next) => {
  try {
    await quiz.editQuiz(req.params.id, req.body);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

exports.deleteQuiz = async (req, res, next) => {
  try {
    const id = req.params.id;
    await quiz.deleteQuiz(id);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

exports.getAllResult = async (req, res, next) => {
  try {
    const studentid = req.user._id;
    const result = await quiz.getAllResult(studentid);
    res.send(result);
  } catch (err) {
    next(err);
  }
};

exports.getQuizResult = async (req, res, next) => {
  try {
    const studentid = req.user._id;
    const submissionid = req.params.id;
    const result = await quiz.getQuizResult(submissionid, studentid);
    res.send(result);
  } catch (err) {
    next(err);
  }
};

exports.getAllResultForTeacher = async (req, res, next) => {
  try {
    const teacherid = req.user._id;
    const result = await quiz.getAllResultForTeacher(teacherid);
    res.send(result);
  } catch (err) {
    next(err);
  }
}

exports.getResultForTeacher = async (req, res, next) => {
  try {
    const submissionid = req.params.id;
    const teacherid = req.user._id;
    const result = await quiz.getResultForTeacher(teacherid, submissionid);
    res.send(result); 
  } catch (err) {
    next(err);
  }
}