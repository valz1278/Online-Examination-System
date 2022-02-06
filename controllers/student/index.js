const student = require("../../services/student");

exports.studentLogin = (req, res, next) => {
  try {
    const user = req.user;
    if (user) return res.send(user);
    res.sendStatus(401);
  } catch (err) {
    next(err);
  }
};

exports.registerStudent = async (req, res, next) => {
  try {
    await student.registerStudent(req.body);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

exports.confirmCode = async(req, res, next) => {
  try {
    const result = await student.confirmCode(req.body);
    return res.send(result);
  } catch (err) {
    next(err);
  }
}

exports.checkRegister = async(req, res, next) => {
  try {
    const result = await student.checkRegister(req.body);
    return res.send(result);
  } catch (err) {
    next(err);
  }
}