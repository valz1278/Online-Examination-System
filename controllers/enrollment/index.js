const Service = require("../../services/enrollment");

exports.getEnrollment = async (req, res, next) => {
  try {
    const result = await Service.getEnrollment(req.user._id);
    res.send(result)
  } catch (err) {
    next(err);
  }
};

exports.getStudentEnrollmentList = async (req,res,next) => {
  try{
    const result = await Service.getStudentEnrollmentList(req.params.id)
    res.send(result)
  } catch(err){
    next(err)
  }
}

exports.addEnrollment = async (req,res,next) => {
  try{
    const {quizid,studentId} = req.body
    await Service.addEnrollment(quizid,studentId)
    res.sendStatus(200)
  }catch(err){
    next(err)
  }
}

exports.deleteEnrollment = async (req,res,next) => {
  try{
    const {quizid,studentId} = req.body
    await Service.deleteEnrollment(quizid,studentId)
    res.sendStatus(200)
  }catch(err){
    next(err)
  }
}