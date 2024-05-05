import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  roll: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^\d{5}[A-Z]\d{4}$/.test(v);
      },
    },
  },
  picture: {
    type: String,
    default: `images/default/profile.png`,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  father_name: {
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
  graduation_type: {
    type: String,
    required: true,
    enum: ["Btech", "Mtech"],
  },
  branch: {
    type: String,
    required: true,
    enum: ["CSE", "MECH", "ECE", "EEE", "IT", "CIVIL"],
  },
  passwd: {
    type: String,
    required: true,
    minLength: 8,
  },
  regulation: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^[R]\d\d$/.test(v);
      },
    },
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
  queries: {
    type: {
      total: {
        type: Number,
        default: 0,
      },
      monthly: {
        type: Number,
        default: 0,
      },
    },
  },
  logins: {
    type: {
      total: {
        type: Number,
        default: 0,
      },
      streak: {
        type: Number,
        default: 0,
      },
    },
  },
  last_active: {
    type: String,
    default: function () {
      return new Date()
        .toISOString()
        .replace(/T/, " ")
        .replace(/\..+/, "")
        .slice(0, 10);
    },
  },
});

studentSchema.index({ roll: 1 }, { unique: true });
studentSchema.index({ email: 1 }, { unique: true });

export default mongoose.model("student", studentSchema);
