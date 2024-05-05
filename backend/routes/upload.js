import express from "express";
import dotenv from "dotenv";
import StudentController from "../controllers/student.js";
import multer from "multer";
import path from "path";

const studentController = StudentController();

dotenv.config();
const app = express.Router();

const storage = multer.memoryStorage();
const uploadStorage = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

const storage2 = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "uploads");
  },
  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now() + "_" + Math.round(Math.random() * 1e9);
    const newFilename = uniqueSuffix + "_" + file.originalname;
    callback(null, newFilename);
  },
});

var upload = multer({ storage: storage2 });

app.route("/exam-fee-receipt").post(upload.single("file"), async (req, res) => {
  try {
    const { challana } = req.body;
    console.log("After file path");
    const path = "images/" + req.file.filename;
    console.log(path);
    res.status(200).json({ status: "success", path });
  } catch (err) {
    res.status(200).json({ errno: 500 });
  }
});

app
  .route("/revaluation-receipt")
  .post(upload.single("file"), async (req, res) => {
    try {
      const { DU_number } = req.body;
      console.log("After file path");
      const path = "images/" + req.file.filename;
      console.log(path);
      res.status(200).json({ status: "success", path });
    } catch (err) {
      res.status(200).json({ errno: 500 });
    }
  });

app
  .route("/certificate-receipt")
  .post(upload.single("file"), async (req, res) => {
    try {
      const { DU_number } = req.body;
      console.log("After file path");
      const path = "images/" + req.file.filename;
      console.log(path);
      res.status(200).json({ status: "success", path });
    } catch (err) {
      res.status(200).json({ errno: 500 });
    }
  });

app.route("/profile-picture").post(upload.single("file"), async (req, res) => {
  console.log(req.file);
  try {
    const { roll } = req.body;
    console.log("Before filepath");
    const filePath = req.body;

    console.log("After file path");
    const path = "images/" + req.file.filename;
    console.log(path);
    res.status(200).json({ status: "success", path });
  } catch (err) {
    console.log(err);
    res.status(200).json({ errno: 500 });
  }
});

const fileUpload = app;
export default fileUpload;
