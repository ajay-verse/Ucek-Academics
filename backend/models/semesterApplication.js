import mongoose from "mongoose";

const semesterApplicationSchema = new mongoose.Schema({
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
  semester: {
    type: Number,
    required: true,
    enum: [1, 2],
  },
  batch: {
    type: Number,
    required: true,
    min: 2016,
    validate: {
      validator: function (v) {
        return v % 1 == 0;
      },
    },
  },
  regulation: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^R\d\d$/.test(v);
      },
    },
  },
  exam_type: {
    type: String,
    required: true,
    enum: ["REG", "SUP"],
  },
  challana: {
    type: String,
    required: true,
  },
  receipt: {
    type: String,
    required: true,
    default: "",
  },
  subjects: {
    type: String,
    required: true,
    default: "",
  },
  checked: {
    type: Boolean,
    default: false,
  },
  date_of_apply: {
    type: Date,
    default: Date.now(),
  },
});

semesterApplicationSchema.index({ challana: 1 }, { unique: true });
semesterApplicationSchema.index({ batch: 1, year: 1, semester: 1, checked: 1 });
semesterApplicationSchema.index({
  roll: 1,
  year: 1,
  semester: 1,
  exam_type: 1,
});

export default mongoose.model("semesterApplication", semesterApplicationSchema);
