import mongoose from "mongoose";

const adminScheme = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^[a-zA-z0-9\.]{2,50}@gmail.com$/.test(v);
      },
    },
  },
  passwd: {
    type: String,
    required: true,
    minLength: 8,
  },

  phoneNo: {
    type: Number,
    required: true,
  },

  role: {
    type: String,
    default: "admin",
    enum: ["admin", "master"],
  },
});

adminScheme.index({ email: 1 }, { unique: true });

export default mongoose.model("admin", adminScheme);
