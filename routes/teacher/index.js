const Router = require("express").Router();
const { requireTeacherLogin, requireTeacherAuth } = require("../../auth/middleware");
const Controller = require("../../controllers/teacher");

Router.post("/login", requireTeacherLogin, Controller.teacherLogin);
Router.post("/signup", Controller.registerTeacher);
Router.post("/confirm", Controller.confirmCode);
Router.post("/signupcheck", Controller.checkRegister);

module.exports = Router;
