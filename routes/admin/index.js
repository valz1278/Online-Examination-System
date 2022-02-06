const Router = require("express").Router();
const Controller = require("../../controllers/admin");
const { requireAdminLogin } = require("../../auth/middleware");

Router.post("/", requireAdminLogin, Controller.adminlogin);

module.exports = Router;
