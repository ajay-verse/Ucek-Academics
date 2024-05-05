import express from "express";
import dotenv from "dotenv";
import Razorpay from "razorpay";
import PaymentController from "../controllers/payment.js";
import path from "path";
const __dirname = path.resolve();

dotenv.config();
const app = express();
const paymentController = PaymentController();
const KEY_ID = process.env.KEY_ID;
const SECRET_KEY = process.env.SECRET_KEY;

app.route("/payment").get(async (req, res) => {
  try {
    const details = {
      roll: req.body.roll,
      name: req.body.name,
      email: req.body.email,
      purpose: req.body.purpose,
      amount: +req.body.amount * 100,
    };
    // res.render("payment_page", { details: details });
    res.status(200).json({ status: "success", details });
  } catch (e) {
    res.status(403).send({ message: "Something went wrong" });
  }
});

app.route("/").get(async (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.route("/paynow").post(async (req, res) => {
  try {
    let { amount, email } = req.body;
    amount = +amount;
    let instance = new Razorpay({ key_id: KEY_ID, key_secret: SECRET_KEY });
    let order = await instance.orders.create({
      amount: amount,
      currency: "INR",
      receipt: Date.now() + "_" + Math.floor(Math.random() * 1000000),
    });
    res.status(201).json({
      success: true,
      order,
      amount,
      email,
    });
  } catch (e) {
    console.error(e);
    res.status(403).send({ message: "Something went wrong" });
  }
});

app.route("/upload-status").post(async (req, res) => {
  const result = await paymentController.createPayment(req.body);
  res.status(200).json(result);
});

const payment = app;
export default payment;
