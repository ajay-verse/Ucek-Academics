import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  year: {
    type: Number,
    default: 0,
    enum: [0, 1, 2, 3, 4],
  },
  branch: {
    type: Number,
    default: 0,
    enum: [0, 1, 2, 3, 4, 5, 6, 7],
  },
  date_of_update: {
    type: String,
    default: function () {
      let currentTime = new Date();
      let ISTOffset = 330;
      let ISTTime = new Date(currentTime.getTime() + ISTOffset * 60000);
      return ISTTime.toISOString().replace(/T/, " ").replace(/\..+/, "");
    },
  },
  data: {
    type: String,
    required: true,
  },
  important: {
    type: Boolean,
    default: false,
  },
  file: {
    type: String,
  },
});

notificationSchema.index({ date_of_update: -1, year: 1, branch: 1 });
notificationSchema.index({ year: 1, date_of_update: -1, branch: 1 });
notificationSchema.index({ branch: 1, date_of_update: -1, year: 1 });
notificationSchema.index({ year: 1, branch: 1, date_of_update: -1 });

export default mongoose.model("notification", notificationSchema);
