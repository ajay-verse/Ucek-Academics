import express from "express";
import config from "config";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import newsFeed from "./routes/newsFeed.js";
import student from "./routes/student.js";
import regulation from "./routes/regulation.js";
import notification from "./routes/notification.js";
import admin from "./routes/admin.js";
import payment from "./routes/payment.js";
import fileUpload from "./routes/upload.js";
import path from "path";
import query from "./routes/query.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || config.get("server.port");
const HOST = process.env.HOST || config.get("server.host");
const MONGO = process.env.MONGO || config.get("mongo.url");

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.set("view engine", "ejs");

let count = 0;

app.get("/api", async (req, res) => {
  res.status(200).json({ message: `server is working [ count: ${++count} ]` });
});

app.use("/api/student", student);
app.use("/api/newsfeed", newsFeed);
app.use("/api/query", query);
app.use("/api/regulation", regulation);
app.use("/api/notification", notification);
app.use("/api/admin", admin);
app.use("/api/payment", payment);
app.use("/api/upload", fileUpload);

const __dirname = path.resolve();
app.use("/images", express.static(path.join(__dirname, "uploads")));

app.use(express.static(path.join(__dirname, "../studentview/dist/my-projext")));
app.use(express.static(path.join(__dirname, "../adminview/dist/my-projewt")));

app.get("/admin*", (req, res) =>
  res.sendFile(
    path.join(__dirname, "../adminview/dist/my-projewt", "index.html")
  )
);

app.get("/*", (req, res) =>
  res.sendFile(
    path.join(__dirname, "../studentview/dist/my-projext", "index.html")
  )
);

mongoose
  .connect(MONGO)
  .then(() => {
    console.log("DB Connected");
    app.listen(PORT, () => console.log(`open http://${HOST}:${PORT}`));
  })
  .catch((error) => console.log("DB Connection Error:", error.message));
