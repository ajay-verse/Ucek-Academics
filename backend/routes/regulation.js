import express from "express"
import RegulationController from "../controllers/regulation.js"

const app = express.Router()
const regulationController = RegulationController()

app.route('/subjects')
    .post(async (req, res) => {
        res.status(200).json(await regulationController.getSubjects(req.body))
    })

const regulation = app
export default regulation
