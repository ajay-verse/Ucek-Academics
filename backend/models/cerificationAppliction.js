import mongoose from "mongoose"

const certificateApplicationSchema = new mongoose.Schema({
    roll: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^\d{5}[A-Z]\d{4}$/.test(v)
            },
        },
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^[a-zA-z0-9\.]{2,50}@gmail.com$/.test(v)
            },
        },
    },
    application_type: {
        type: String,
        required: true,
        enum: ["bonafide", "custodian", "course_completion_certificate"],
    },
    name: {
        type: String,
        required: true,
    },
    purpose: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
        enum: [6, 12, 18, 24],
    },
    receipt: {
        type: String,
        required: true,
    },
    DU_number: {
        type: String,
        required: true,
    },
    date_of_payment: {
        type: Date,
        required: true,
    },
    approved: {
        type: Boolean,
        required: true,
        default: false,
    }
})

certificateApplicationSchema.index({ DU_number: 1 }, { unique: true })
certificateApplicationSchema.index({ roll: 1, application_type: 1, date_of_payment: 1 }, { unique: true })

export default mongoose.model("certificateApplication", certificateApplicationSchema)