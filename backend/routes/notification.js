import express from "express";
import NotificationController from "../controllers/notification.js";

const app = express.Router();
const notificationController = NotificationController();

app.route("/get").post(async (req, res) => {
  res.status(200).json(await notificationController.getNotifications(req.body));
});

app.route("/post-one").post(async (req, res) => {
  res.status(200).json(await notificationController.postNotification(req.body));
});

app.route("/delete").post(async (req, res) => {
  res
    .status(200)
    .json(await notificationController.deleteNotification(req.body));
});

const notification = app;
export default notification;
