import mongoose from "mongoose";

// Define the schema for the attendance record
const attendanceSchema = new mongoose.Schema({
  roll: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^\d{5}[A-Z]\d{4}$/.test(v);
      },
    },
  },
  year: {
    type: Number,
    required: true,
    enum: [1, 2, 3, 4],
  },
  course_code: {
    type: String,
    required: true,
  },
  attendance: [
    {
      month: {
        type: Number,
        required: true,
        min: 1,
        max: 12,
      },
      classesConducted: {
        type: Number,
        required: true,
      },
      classesAttended: {
        type: Number,
        required: true,
      },
    },
  ],
});

// Create the Attendance model

export default mongoose.model("attendance", attendanceSchema);
