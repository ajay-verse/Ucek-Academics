import express from "express";
import AdminController from "../controllers/admin.js";
import RegulationController from "../controllers/regulation.js";

const app = express.Router();
const adminController = new AdminController();
const regulationController = new RegulationController();

app.route("/login").post(async (req, res) => {
  res.status(200).json(await adminController.login(req.body));
});
app.route("/register").post(async (req, res) => {
  res.status(200).json(await adminController.register(req.body));
});

app.route("/get-student-details").post(async (req, res) => {
  res.status(200).json(await adminController.getStudentDetails(req.body));
});

app.route("/add-regulation").post(async (req, res) => {
  res.status(200).json(await regulationController.updateRegulation(req.body));
});

app.route("/upload-result").post(async (req, res) => {
  res.status(200).json(await adminController.uploadResult(req.body));
});

app.route("/upload-supplyresult").post(async (req, res) => {
  res.status(200).json(await adminController.uploadSupplyResult(req.body));
});

app.route("/updateprofile").post(async (req, res) => {
  res.status(200).json(await adminController.updateProfile(req.body));
});

app.route("/semester-applications").post(async (req, res) => {
  res.status(200).json(await adminController.getSemesterApplications(req.body));
});

app.route("/approve-semester-application").post(async (req, res) => {
  res
    .status(200)
    .json(await adminController.approveSemesterApplication(req.body));
});

app.route("/getAllHallTicketRequests").post(async (req, res) => {
  res
    .status(200)
    .json(await adminController.getAllHallTicketRequests(req.body));
});

app.route("/reject-hallticket").post(async (req, res) => {
  res.status(200).json(await adminController.rejectHallticket(req.body));
});

app.route("/approve-hallticket").post(async (req, res) => {
  res.status(200).json(await adminController.approveHallticket(req.body));
});

app.route("/certificate-applications").post(async (req, res) => {
  res.status(200).json(await adminController.getCertificates(req.body));
});

app.route("/approve-certificate-application").post(async (req, res) => {
  res.status(200).json(await adminController.approveCertifate(req.body));
});

app.route("/revaluation-application").post(async (req, res) => {
  res
    .status(200)
    .json(await adminController.getRevaluationCertificates(req.body));
});

app.route("/approve-revaluation-application").post(async (req, res) => {
  res
    .status(200)
    .json(await adminController.approveRevaluationCertificate(req.body));
});

app.route("/delete-revaluation-application").post(async (req, res) => {
  res
    .status(200)
    .json(await adminController.deleteRevaluationCertificate(req.body));
});

app.route("/send-result").post(async (req, res) => {
  res.status(200).json(await adminController.sendResult(req.body));
});

app.route("/send-results").post(async (req, res) => {
  res.status(200).json(await adminController.sendAllResults(req.body));
});

app.route("/metadata").post(async (req, res) => {
  res.status(200).json(await adminController.getMetaData());
});
app.route("/getTotalQuery").post(async (req, res) => {
  res.status(200).json(await adminController.getTotalQuery());
});
app.route("/getQuery").post(async (req, res) => {
  res.status(200).json(await adminController.getQuery());
});

app.route("/checkDuplicateAttendence").post(async (req, res) => {
  res
    .status(200)
    .json(await adminController.checkDuplicateAttendence(req.body));
});

app.route("/upload-attendance").post(async (req, res) => {
  res.status(200).json(await adminController.uploadAttendance(req.body));
});

app.route("/get-admin-list").get(async (req, res) => {
  res.status(200).json(await adminController.getAllAdmin());
});

const admin = app;
export default admin;
