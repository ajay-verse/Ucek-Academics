import mongoose, { Schema } from "mongoose"

const metaDataScheme = new mongoose.Schema({
    key: {
        type: String,
        required: true
    },
    value: {
        type: Schema.Types.Mixed,
        required: true
    },
})

export default mongoose.model("metaData", metaDataScheme)
