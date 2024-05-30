import mongoose, { Schema, model, models } from "mongoose"

const consultantAvailablitySchema = new Schema({
    consulatant: {
        type: mongoose.Types.ObjectId,
        ref: "users"
    },
    from: {
        type: String,
    },
    to: {
        type: String,
    },
    sessionDuration: {
        type: String,
    },
    sessionCharge: {
        type: String,
    },
    date: {
        type: Date,
    },
})

export const ConsultantAvailability = models.availability || model("availability", consultantAvailablitySchema)

