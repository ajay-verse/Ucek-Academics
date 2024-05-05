import admin from "../models/admin.js";
import examResult from "../models/examResult.js";
import student from "../models/student.js";
import metaData from "../models/metaData.js";
import semesterApplication from "../models/semesterApplication.js";
import certificateApplication from "../models/cerificationAppliction.js";
import revalutionApplication from "../models/revalutionApplication.js";
import sendMail from "../utility_modules/mailHandler.js";
import StudentController from "./student.js";
import QueryModel from "../models/query.js";
import hallticket from "../models/hallticket.js";
import attendance from "../models/attendance.js";
import HashMap from "hashmap";
// import { ObjectID } from "mongodb";

const studentController = StudentController();

function getHTMLFormat(cumReg, gpa, result) {
  if (!result) {
    throw "No result available";
  }
  result.subjects = Object.entries(result.subjects);
  console.log(result.subjects)
  let body = `
                <p>Roll Number: ${result.roll}</p>
                <p>Year: ${result.year}, Semester: ${result.semester}</p>
                <table>
                    <tr>
                        <th>COURSE CODE</th>
                        <th>COURSE TITLE</th>
                        <th>POINTS</th>
				    </tr>
            `;
  for (const subject of result.subjects) {
    body += `
                    <tr>
                        <th>${subject[1]['courseCode']}</th>
                        <td>${subject[1]['courseTitle']}</td>
                        <th>${subject[1]['gradePoints']}</th>
                    </tr>
                `;
  }
  body += `
                </table>
                <p>GPA : ${gpa}</p>
                <p>Credits : ${cumReg}</p>
            `;
  return body;
}

export default function AdminController() {
  return {
    login: async function ({ email, passwd }) {
      try {
        const result = await admin.findOne({ email: email, passwd: passwd });
        delete result.passwd;
        return result;
      } catch (e) {
        return { errno: 404, ...e };
      }
    },
    register: async function ({
      first_name,
      last_name,
      email,
      passwd,
      phoneNo,
    }) {
      try {
        const data = {
          first_name: first_name,
          last_name: last_name,
          email: email,
          passwd: passwd,
          phoneNo: phoneNo,
        };
        console.log(data);
        await admin.validate(data);
        if (await admin.findOne({ email: email })) {
          throw new Error("duplicate email address");
        }
        const result = await admin.create(data);
        return result;
      } catch (e) {
        console.log(e);

        return { errno: 403, ...e };
      }
    },
    getStudentDetails: async function ({ roll }) {
      try {
        const result = await student.findOne({ roll: roll });
        return result;
      } catch (e) {
        return { errno: 404, ...e };
      }
    },
    uploadResult: async function ({
      roll,
      semester,
      year,
      subjects,
      regulation,
      result_type,
    }) {
      // console.log('Hi')
      try {
        const stud = await student.findOne({ roll: roll });
        const p_data = await examResult.findOne({
          roll: roll,
          semester: semester,
          year: year,
        });
        console.log(p_data);
        if (!p_data) {
          // console.log('Mok')
          const examRes = new examResult({
            roll: roll,
            semester: semester,
            year: year,
            subjects: subjects,
            batch: stud.batch,
            regulation: regulation,
            result_type: result_type,
          });
          const result = await examRes.save();
          console.log('Hello')
          this.sendResult({roll, regulation_:regulation, year, semester});
          return result;
        } else {
          // console.log('Drrr')
          const p_sub = JSON.parse(JSON.stringify(p_data.subjects));
          const result = await examResult.updateOne(
            { roll: roll, semester: semester, year: year },
            {
              $set: {
                subjects: {
                  ...p_sub,
                  ...sub,
                },
              },
            }
          );
          // console.log('Ajay')
          this.sendResult({roll, regulation_:regulation, year, semester});
          return result;
        }
      } catch (e) {
        return { errno: 404, ...e };
      }
    },
    uploadSupplyResult: async function ({ roll, semester, year, subjects }) {
      let sub = {};
      // console.log(subjects);
      for (var i in subjects) {
        sub[subjects[i].courseCode] = subjects[i];
      }
      try {
        const examRes = await examResult.findOne({
          roll: roll,
          semester: semester,
          year: year,
        });
        if (examRes == null) {
          return {
            errno: 404,
            message:
              "User results not found for Semester: " +
              semester +
              " and year: " +
              year +
              " in regular results data",
          };
        }
        const savedResults = examRes.subjects;

        for (const index in savedResults) {
          var course_code = savedResults[index].courseCode;
          if (course_code in sub) {
            if (
              sub[course_code].courseTitle != savedResults[index].courseTitle
            ) {
              return {
                errno: 404,
                message:
                  "The courseTitle in database (" +
                  savedResults[index].courseTitle +
                  ") is not matching with courseTitle you sent (" +
                  sub[course_code].courseTitle +
                  ") for courseCode: " +
                  course_code,
              };
            }
            continue;
          }
          sub[savedResults[index].courseCode] = savedResults[index];
        }

        var finalSubjects = new Array();

        for (const item in sub) {
          finalSubjects.push(sub[item]);
        }
        // console.log(finalSubjects);

        const result = await examResult.findOneAndUpdate(
          {
            roll: roll,
            semester: semester,
            year: year,
          },
          {
            $set: {
              subjects: finalSubjects,
            },
          }
        );
        return result;
      } catch (e) {
        return { errno: 404, ...e };
      }
    },
    updateProfile: async function ({ email, passwd, npasswd }) {
      try {
        const result = await admin.updateOne(
          { email: email, passwd: passwd },
          { passwd: npasswd }
        );
        return result;
      } catch (e) {
        return { errno: 404, ...e };
      }
    },
    getSemesterApplications: async function ({ exam_type }) {
      try {
        const results = await semesterApplication.find({
          exam_type: exam_type,
          checked: false,
        });
        return results;
      } catch (e) {
        return { errno: 404, ...e };
      }
    },
    approveSemesterApplication: async function ({ roll, exam_type, challana }) {
      try {
        const results = await semesterApplication.findOneAndUpdate(
          {
            roll: roll,
            exam_type: exam_type,
            challana: challana,
          },
          { $set: { checked: true } }
        );
        const stud = await student.findOne({ roll: roll });
        await sendMail({
          receiverMail: stud.email,
          static_msg: "approve_result_application",
          details: {
            name: stud.first_name,
            roll: stud.roll,
            year: results.year,
            semester: results.semester,
            challana: challana,
          },
        });
        return results;
      } catch (e) {
        return { errno: 404, ...e };
      }
    },
    getRevaluationCertificates: async function () {
      try {
        const result = await revalutionApplication.find({ checked: false });
        return result;
      } catch (e) {
        return { errno: 404, ...e };
      }
    },
    approveRevaluationCertificate: async function ({ roll, DU_number }) {
      try {
        const result = await revalutionApplication.updateOne(
          { roll: roll, DU_number: DU_number },
          {
            $set: {
              checked: true,
            },
          }
        );
        return result;
      } catch (e) {
        return { errno: 404, ...e };
      }
    },

    deleteRevaluationCertificate: async function ({ id }) {
      try {
        const savedApplication = await revalutionApplication.findOne({
          _id: id,
        });
        if (savedApplication != null) {
          await revalutionApplication.deleteOne({ _id: id });
          return savedApplication;
        } else {
          return { errno: 404, ...e };
        }
      } catch (e) {
        return { errno: 404, ...e };
      }
    },
    getCertificates: async function ({ approved }) {
      try {
        const results = await certificateApplication.find({
          approved: false,
        });
        return results;
      } catch (e) {
        return { errno: 404, ...e };
      }
    },
    approveCertifate: async function ({ roll, DU_number, application_type }) {
      const results = await certificateApplication.findOneAndUpdate(
        {
          roll: roll,
          DU_number: DU_number,
        },
        { $set: { approved: true } }
      );
      const stud = await student.findOne({ roll: roll });
      await sendMail({
        receiverMail: stud.email,
        static_msg: "approve_applications",
        details: {
          name: stud.first_name,
          roll: stud.roll,
          application_type: application_type,
        },
      });
      return results;
    },
    sendResult: async function ({ roll, regulation_, year, semester }) {
      try {
        console.log('Ajay')
        const stud = await student.findOne({ roll: roll });
        let [cumReg, gpa, result] = await studentController.getResult({
          roll: roll,
          regulation_: regulation_,
          year: year,
          semester: semester,
        });
        let body = getHTMLFormat(cumReg, gpa, result);
        console.log(cumReg, gpa)
        let status = await sendMail({
          receiverMail: stud.email,
          mailBody: body,
        });
        return status;
      } catch (e) {
        return { errno: 404, ...e };
      }
    },
    sendAllResults: async function ({ batch, year, semester }) {
      const studs = await student.find({ batch: batch });
      for (const stud of studs) {
        try {
          await this.sendResult({
            roll: stud.roll,
            regulation_: stud.regulation,
            year: year,
            semester: semester,
          });
        } catch (e) {}
      }
      return { message: "mails sent" };
    },
    getMetaData: async function () {
      try {
        const result = await metaData.find();
        return result;
      } catch (e) {
        return { errno: 404, ...e };
      }
    },
    getTotalQuery: async function () {
      try {
        const result = await QueryModel.find();
        return result;
      } catch (e) {
        return { errno: 404, ...e };
      }
    },
    getQuery: async function () {
      try {
        const result = await QueryModel.find();
        return result;
      } catch (e) {
        return { errno: 404, ...e };
      }
    },
    getAllAdmin: async function () {
      try {
        const result = await admin.find();
        return result;
      } catch (e) {
        return { errno: 404, ...e };
      }
    },
    getAllHallTicketRequests: async function () {
      try {
        const result = await hallticket.find({ status: false });
        return result;
      } catch (e) {
        return { errno: 404, ...e };
      }
    },
    rejectHallticket: async function ({ id }) {
      try {
        const result = await hallticket.findOne({ _id: id });
        if (result) {
          await hallticket.deleteOne({ _id: id });
        } else {
          return { errno: 404, ...e };
        }
        return result;
      } catch (e) {
        return { errno: 404, ...e };
      }
    },
    approveHallticket: async function ({ id }) {
      console.log(id);
      try {
        const result = await hallticket.findOneAndUpdate(
          { _id: id },
          { status: true }
        );
        if (result) {
        } else {
          return { errno: 404, ...e };
        }
        return result;
      } catch (e) {
        return { errno: 404, ...e };
      }
    },
    checkDuplicateAttendence: async function ({ month }) {
      return { duplicate: false };
    },
    uploadAttendance: async function (data) {
      const record = await attendance.findOne({
        roll: data.roll,
        year: data.year,
        course_code: data.course_code,
      });

      if (record == undefined) {
        const item = new attendance({
          year: data.year,
          roll: data.roll,
          course_code: data.course_code,
          attendance: data.attendance,
        });
        await item.save();
        return true;
      }

      const monthCheck = new HashMap();

      for (var i = 0; i < record.attendance.length; i++) {
        monthCheck.set(record.attendance[i].month, i);
      }

      for (var item of data.attendance) {
        var ind = monthCheck.get(parseInt(item.month));
        if (ind != undefined) {
          record.attendance[ind].classesAttended = item.classesAttended;
          record.attendance[ind].classesConducted = item.classesConducted;
        } else {
          record.attendance.push(item);
        }
      }
      try {
        await record.save();
      } catch (e) {
        return { errno: 501, ...e };
      }
      return true;
    },
  };
}
