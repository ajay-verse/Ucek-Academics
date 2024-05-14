import mongoose from "mongoose";
import { ObjectId } from "mongodb";
const hallticketSchema = new mongoose.Schema(
  {
    user_id: {
      type: ObjectId,
      ref: "student",
    },
    roll_no: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    father_name: {
      type: String,
      required: true,
    },
    branch: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    semester: {
      type: String,
      required: true,
    },
    regularSupply: {
      type: String,
      required: true,
    },
    // listOfSubjects: {
    //   type: String,
    //   required: true,
    // },
    status: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Hallticket", hallticketSchema);
