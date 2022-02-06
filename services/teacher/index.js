const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const config = require("../../config");

const Teacher = require("../../models/Teacher");

exports.verifyTeacherAuthentication = async ({ _id, email }) => {
  const result = await Teacher.findOne(
    { _id, email },
    { password: false }
  );
  return result.toJSON();
};

exports.TeacherLogin = async ({ email, password }) => {
  const result = await Teacher.findOne(
    { email, password },
    { password: false }
  );
  if (result) {
    const teacher = result.toJSON();
    const token = jwt.sign({...teacher, role: "teacher"}, config.jwtKey);
    return { ...teacher, token };
  }
  return null;
};

exports.registerTeacher = async (data) => {
  await Teacher.create(data);
  return "OK";
};

exports.checkRegister = async ({ email }) => {
  const result = await Teacher.findOne(
    { email }
  );
  return result;
}

exports.confirmCode = async ({ email }) => {
  let result = { Message: "", Data: {} };
  const code = Math.floor(100000 + Math.random() * 900000);
  result.Data = code;

  const mailOptions = {
    from: process.env.email_username,
    to: email,
    subject: "Verification Code",
    text: "Your code is: \n" + code,
  };

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.email_username,
      pass: process.env.email_password,
    },
  });

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });

  return result;
};

  return result;
};
