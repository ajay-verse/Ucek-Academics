import mongoose from "mongoose"

const paymentSchema = new mongoose.Schema({
    roll: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^\d{5}[A-Z]\d{4}$/.test(v)
            },
        },
    },
    name: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 70,
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
    purpose: {
        type: String,
        required: true,
        enum: ['Exam Fee', 'bonafide', 'custodian', 'course_completion_certificate'],
    },
    amount: {
        type: Number,
        required: true,
        min: 0,
    },
    payment_id: {
        type: String,
        required: true,
    },
    order_id: {
        type: String,
        required: true,
    },
    signature: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['success', 'failed'],
    },
    time_stamp: {
        type: Date,
        default: Date,
    },
})

paymentSchema.index({ payment_id: 1 }, { unique: true })
paymentSchema.index({ roll: 1, time_stamp: -1 }, { unique: true })

export default mongoose.model('Payment', paymentSchema)
