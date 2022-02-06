const Router = require("express").Router();
const Controller = require("../../controllers/enrollment");
const {
  requireStudentAuth,
  requireAdminAuth,
  requireTeacherAuth,
} = require("../../auth/middleware");

Router.get("/student", requireStudentAuth, Controller.getEnrollment);

Router.post(
  "/teacher",
  requireTeacherAuth,
  Controller.addEnrollment
);
Router.put(
  "/teacher",
  requireTeacherAuth,
  Controller.deleteEnrollment
);
Router.get(
  "/quiz/:id",
  requireTeacherAuth,
  Controller.getStudentEnrollmentList
);

module.exports = Router;
