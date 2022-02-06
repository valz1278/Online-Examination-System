const Router = require("express").Router();
const Controller = require("../../controllers/quiz");
const { requireStudentAuth, requireTeacherAuth } = require("../../auth/middleware");

Router.get("/teacher", requireTeacherAuth, Controller.getAllResultForTeacher);
Router.get("/teacher/:id", requireTeacherAuth, Controller.getResultForTeacher);
Router.get("/", requireStudentAuth, Controller.getAllResult);
Router.get("/:id", requireStudentAuth, Controller.getQuizResult);

module.exports = Router;