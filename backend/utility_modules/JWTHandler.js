import dotenv from "dotenv"
import jwt from "jsonwebtoken"

dotenv.config()

export default function verify(token) {
    try {
        jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, decoded) {
            err ? false : decoded
        });
    } catch (err) {
        return false
    }
}
