const Router = require("express").Router();
const Controller = require("../../controllers/quiz");
const {
  requireStudentAuth,
  requireAdminAuth,
  requireTeacherAuth,
} = require("../../auth/middleware");

Router.get("/", Controller.getAllQuiz);
Router.get("/teacher", requireTeacherAuth, Controller.getAllQuizForTeacher);
// Endpoint get quiz tapi dari user (student) answer hidden
Router.get("/:id", requireStudentAuth, Controller.getQuiz);
// Endpoint for submit quiz
Router.post("/submit", requireStudentAuth, Controller.submitQuiz);

// Endpooint get quiz ini untuk admin / teacher
Router.get("/teacher/:id", Controller.getQuizForTeacher);
// Create new quiz
Router.post("/teacher", requireTeacherAuth, Controller.createQuiz);
// Delete quiz
Router.delete("/teacher/:id", Controller.deleteQuiz);
// Edit Quiz
Router.put("/teacher/:id", Controller.editQuiz);

module.exports = Router;
