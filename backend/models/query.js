import mongoose from "mongoose";
import { ObjectId } from "mongodb";
const querySchema = new mongoose.Schema({
  adminId: {
    type: ObjectId,
    ref: "admin",
  },
  user_id: {
    type: ObjectId,
    ref: "student",
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  topic_of_subject: {
    type: String,
    required: true,
  },
  query_msg: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Query", querySchema);
