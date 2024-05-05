import regulation from "../models/regulation.js"

export default function RegulationController() {
    return {
        getSubjects: async function ({ regulation_, year, semester }) {
            try {
                const regulation_subjects = await regulation.findOne({
                    regulation: regulation_,
                    year: year,
                    semester: semester
                })
                // console.log(regulation_subjects)
                return regulation_subjects
            } catch (e) {
                return { errno: 404, ...e }
            }
        },
        updateRegulation: async function ({ regulation_, year, semester, subjects }) {
            try {
                const reg = new regulation({
                    regulation: regulation_,
                    year: year,
                    semester: semester,
                    subjects: subjects
                })
                const result = reg.save()
                return result
            } catch (e) {
                return { errno: 404, ...e }
            }
        }
    }
}