const passport = require("passport");

//for login
exports.requireStudentLogin = passport.authenticate("student", {
  session: false,
});
exports.requireStudentAuth = passport.authenticate("verifyStudent", {
  session: false,
});
exports.requireAdminLogin = passport.authenticate("admin", {
  session: false,
});
exports.requireAdminAuth = passport.authenticate("verifyAdmin", {
  session: false,
});
exports.requireTeacherLogin = passport.authenticate("teacher", {
  session: false,
});
exports.requireTeacherAuth = passport.authenticate("verifyTeacher", {
  session: false,
});