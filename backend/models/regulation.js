import mongoose from "mongoose";

const regulationSchema = new mongoose.Schema({
  regulation: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^R\d\d$/.test(v);
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
  subjects: {
    type: [],
    required: true,
    default: "",
  },
});

regulationSchema.index(
  { regulation: 1, year: 1, semester: 1, subjects:[]},
  { unique: true }
);

export default mongoose.model("regulation", regulationSchema);
