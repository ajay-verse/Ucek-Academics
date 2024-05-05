import express from "express";
import StudentController from "../controllers/student.js";

const app = express.Router();
const studentController = StudentController();

app.route("/login").post(async (req, res) => {
  res.status(200).json(await studentController.login(req.body));
});

app.route("/register").post(async (req, res) => {
  res.status(200).json(await studentController.register(req.body));
});

app.route("/activate/").post(async (req, res) => {
  res.status(200).json(await studentController.emailVerification(req.body));
});

app.route("/updateprofile").post(async (req, res) => {
  res.status(200).json(await studentController.updateProfile(req.body));
});

app.route("/updatepasswd").post(async (req, res) => {
  res.status(200).json(await studentController.updatePasswd(req.body));
});

app.route("/result").post(async (req, res) => {
  res.status(200).json(await studentController.getResult(req.body));
});

app.route("/applyforsemester").post(async (req, res) => {
  res.status(200).json(await studentController.applyForSemester(req.body));
});

app.route("/applyforcertificate").post(async (req, res) => {
  res.status(200).json(await studentController.applyForCertificates(req.body));
});

app.route("/applyforrevaluation").post(async (req, res) => {
  res.status(200).json(await studentController.applyForRevaluation(req.body));
});

app.route("/get-certificate-status").post(async (req, res) => {
  res.status(200).json(await studentController.getCertificateStatus(req.body));
});

app.route("/get-hallticket").post(async (req, res) => {
  res.status(200).json(await studentController.getHallticket(req.body));
});
app.route("/create-hallticket").post(async (req, res) => {
  res.status(200).json(await studentController.createHallticket(req.body));
});

app.route("/metadata").post(async (req, res) => {
  res.status(200).json(await studentController.getStreak(req.body));
});

app.route("/getAttendance").post(async (req, res) => {
  res.status(200).json(await studentController.getAttendance(req.body));
});

app.route("/getCourseIds").post(async (req, res) => {
  res.status(200).json(await studentController.getCourseIds(req.body));
});

const student = app;
export default student;
