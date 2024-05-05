import express from "express";
import QueryController from "../controllers/query.js";

const app = express.Router();

let queryController = QueryController();

app.route("/post-query").post(async (req, res) => {
  res.status(200).json(await queryController.postQuery(req.body));
});

const query = app;
export default query;
