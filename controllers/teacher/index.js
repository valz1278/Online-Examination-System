const teacher = require("../../services/teacher");

exports.teacherLogin = (req, res, next) => {
    try{
        const user = req.user;
        if (user) return res.send(user);
        res.sendStatus(401);
    } catch (err) {
        next(err);
    }
};

exports.registerTeacher = async (req, res, next) => {
    try {
        await teacher.registerTeacher(req.body);
        res.sendStatus(200);
    } catch (err) {
        next(err);
    }
};

exports.confirmCode = async(req, res, next) => {
    try {
      const result = await teacher.confirmCode(req.body);
      return res.send(result);
    } catch (err) {
      next(err);
    }
  }
  
  exports.checkRegister = async(req, res, next) => {
    try {
      const result = await teacher.checkRegister(req.body);
      return res.send(result);
    } catch (err) {
      next(err);
    }
  }