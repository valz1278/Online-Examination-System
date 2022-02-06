const Admin = require("../../models/Admin");
const jwt = require("jsonwebtoken");
const config = require("../../config");

exports.getAdmin = async ({ email, password }, fields = {}) => {
  const user = await Admin.findOne({ email, password }, fields);
  if (user) return user.toJSON()
  return null;
};

exports.AdminLogin = async ({ email, password }) => {
  const admin = await this.getAdmin({ email, password });
  if (admin) {
    const token = jwt.sign({...admin,role: "admin"}, config.jwtKey);
    return { ...admin, token };
  }
  return null;
};

exports.verifyAdminAuthentication = async (id, email, password) => {
  const admin = await Admin.findOne({ _id: id, email, password });
  if (admin) return admin.toJSON();
  return null;
};
