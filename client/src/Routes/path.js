import { lazy } from "react";
const StudentLogin = lazy(() => import("../containers/StudentLogin"));
const LoginMenu = lazy(() => import("../containers/LoginMenu"));
const SignupMenu = lazy(() => import("../containers/SignupMenu"));
const StudentSignup = lazy(() => import("../containers/StudentSignup"));
const Home = lazy(() => import("../containers/Home"));
const NotFound = lazy(() => import("../containers/NotFound"));
const Exam = lazy(() => import("../containers/Exam"));
const ExamList = lazy(() => import("../containers/ExamList"));
const Results = lazy(() => import("../containers/Results"));
const CreateExam = lazy(() => import("../containers/CreateExam"));
const AdminLogin = lazy(() => import("../containers/AdminLogin"));
const Review = lazy(() => import("../containers/Review"));
const AdminExamList = lazy(() => import("../containers/Admin/ExamList"));
const Enrollment = lazy(() => import("../containers/Admin/Enrollment"));
const UploadExam = lazy(() => import("../containers/UploadExam"));
const TeacherLogin = lazy(() => import("../containers/TeacherLogin"));
const TeacherSignup = lazy(() => import("../containers/TeacherSignup"));
const ResultTeacher = lazy(() => import("../containers/ResultTeacher"));
const ReviewTeacher = lazy(() => import("../containers/ReviewTeacher"));
const TeacherExam = lazy(() => import("../containers/TeacherExam"));

const routes = [
  {
    path: "/login",
    name: "login menu",
    exact: true,
    component: LoginMenu,
  },
  {
    path: "/signup",
    name: "signup menu",
    exact: true,
    component: SignupMenu,
  },
  {
    path: "/student/login",
    name: "student login",
    exact: true,
    component: StudentLogin,
  },
  {
    path: "/teacher/login",
    name: "teacher login",
    exact: true,
    component: TeacherLogin,
  },
  {
    path: "/admin/login",
    name: "admin login",
    exact: true,
    component: AdminLogin,
  },
  {
    path: "/",
    name: "home",
    exact: true,
    protected: true,
    component: Home,
  },
  {
    path: "/exam",
    name: "exam list",
    protected: true,
    exact: true,
    component: ExamList,
  },
  {
    path: "/results",
    name: "results list",
    protected: true,
    exact: true,
    component: Results,
  },
  {
    path: "/teacher/results",
    name: "teacher results",
    protected: "teacher",
    exact: true,
    component: ResultTeacher,
  },
  {
    path: "/teacher/results/:id",
    name: "teacher results review",
    protected: "teacher",
    exact: true,
    component: ReviewTeacher,
  },
  {
    path: "/exam/:id",
    name: "Exam",
    protected: true,
    component: Exam,
  },
  {
    path: "/results/:id",
    name: "Review result",
    protected: true,
    component: Review,
  },
  {
    path: "/student/signup",
    name: "Student Signup",
    exact: true,
    component: StudentSignup,
  },
  {
    path: "/teacher/signup",
    name: "Teacher Signup",
    exact: true,
    component: TeacherSignup,
  },
  {
    path: "/create",
    name: "Create Exam",
    exact: true,
    protected: "teacher",
    component: CreateExam,
  },
  {
    path: "/upload",
    name: "Upload Exam",
    exact: true,
    protected: "teacher",
    component: UploadExam,
  },
  {
    path: "/teacher/exam",
    name: "Teacher exam list",
    exact: true,
    protected: "teacher",
    component: AdminExamList,
  },
  {
    path: "/teacher/exam/:id",
    name: "Teacher exam",
    exact: true,
    protected: "teacher",
    component: TeacherExam,
  },
  {
    path: "/teacher/exam/enrollment/:id",
    name: "Enrollment",
    protected: "teacher",
    component: Enrollment,
  },
  {
    name: "notfound",
    exact: true,
    component: NotFound,
  },
];

export default routes;
