const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const Student = require("../services/student");
const Admin = require("../services/admin");
const Teacher = require("../services/teacher");
const config = require("../config");

passport.use(
  "admin",
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      try {
        // Match user
        const account = await Admin.AdminLogin({ email, password });
        if (account) {
          return done(null, { ...account, role: "admin" });
        } else
          return done(null, {
            type: "error",
            message: "Incorrect username or password.",
          });
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.use(
  "teacher",
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      try {
        // Match user
        const account = await Teacher.TeacherLogin({ email, password });
        if (account) {
          return done(null, { ...account, role: "teacher" });
        } else
          return done(null, {
            type: "error",
            message: "Incorrect username or password.",
          });
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.use(
  "student",
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      try {
        // Match user
        const account = await Student.studentLogin({ email, password });
        if (account) {
          return done(null, { ...account, role: "student" });
        } else
          return done(null, {
            type: "error",
            message: "Incorrect username or password.",
          });
      } catch (err) {
        done(err);
      }
    }
  )
);

//passport authorization
passport.use(
  "verifyStudent",
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.jwtKey,
    },
    async (payload, done) => {
      try {
        if (payload.exp > Date.now())
          return done(null, false, {
            type: "error",
            message: "expired",
          });
        const account = await Student.verifyStudentAuthentication({
          _id: payload._id,
          email: payload.email,
          password: payload.password,
        });
        done(null, account);
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.use(
  "verifyTeacher",
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.jwtKey,
    },
    async (payload, done) => {
      try {
        if (payload.exp > Date.now())
          return done(null, false, {
            type: "error",
            message: "expired",
          });
        const account = await Teacher.verifyTeacherAuthentication({
          _id: payload._id,
          email: payload.email,
          password: payload.password,
        });
        done(null, account);
      } catch (err) {
        done(err);
      }
    }
  )
);

//passport authorization
passport.use(
  "verifyAdmin",
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.jwtKey,
    },
    async (payload, done) => {
      try {
        if (payload.exp > Date.now())
          return done(null, false, {
            type: "error",
            message: "expired",
          });
        const account = await Admin.verifyAdminAuthentication(
          payload._id,
          payload.email,
          payload.password
        );
        done(null, account);
      } catch (err) {
        done(err);
      }
    }
  )
);
