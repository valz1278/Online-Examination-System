const Router = require("express").Router();
const { requireStudentLogin, requireStudentAuth } = require("../../auth/middleware");
const Controller = require("../../controllers/student");

Router.post("/login", requireStudentLogin, Controller.studentLogin);
Router.post("/signup", Controller.registerStudent);
Router.post("/confirm", Controller.confirmCode);
Router.post("/signupcheck", Controller.checkRegister);

module.exports = Router;
