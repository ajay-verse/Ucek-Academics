import notification from "../models/notification.js";

export default function NotificationController() {
  return {
    getNotifications: async function ({ year, branch, limit, skip }) {
      try {
        let filter = {};
        if (year) filter.year = year;
        if (branch) filter.branch = branch;
        const result = await notification
          .find({
            ...filter,
          })
          .skip(skip || 0)
          .limit(limit || 10)
          .sort({ date_of_update: -1 });
        return result;
      } catch (e) {
        return { ...e, errno: 404 };
      }
    },
    postNotification: async function ({ year, branch, data, important, file }) {
      try {
        const notifi = new notification({
          year: year || 0,
          branch: branch || 0,
          data: data,
          important: important || false,
          file: file || null,
        });
        const result = await notifi.save();
        return result;
      } catch (e) {
        return { ...e, errno: 403 };
      }
    },
    deleteNotification: async function ({ _id }) {
      try {
        const result = await notification.deleteOne({ _id: _id });
        return result;
      } catch (e) {
        return { ...e, errno: 403 };
      }
    },
  };
}
