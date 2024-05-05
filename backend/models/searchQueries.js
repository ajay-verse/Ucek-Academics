import mongoose, { Schema } from "mongoose"

const searchQuerySchema = new mongoose.Schema({
    instance: {
        type: String,
        default: function () {
            return new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
        }
    },
    query: {
        type: Schema.Types.Mixed
    }
})

searchQuerySchema.index({ instance: -1 })

export default mongoose.model("searchQuery", searchQuerySchema)
