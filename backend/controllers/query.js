import Query from "../models/query.js";
import student from "../models/student.js";
export default function QueryController() {
  return {
    postQuery: async function ({
      user_id,
      name,
      email,
      topic_of_subject,
      query_msg,
      adminId,
    }) {
      try {
        let data = await student.findOneAndUpdate(
          { _id: user_id },
          {
            $inc: { "queries.total": 1 },
          }
        );
        console.log(data);
        const query = new Query({
          user_id,
          adminId,
          name,
          email,
          topic_of_subject,
          query_msg,
        });
        const result = query.save();
        return result;
      } catch (e) {
        return { errno: 404, ...e };
      }
    },
  };
}
