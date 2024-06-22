import { Schema, model, models } from "mongoose"

const consultantAvailablitySchema = new Schema({
    consultant: {
        type: String,
        required: [true, "Consultant id is compulsory"],
    },
    from: {
        type: String,
        required: [true, "From time must be provided"],
    },
    to: {
        type: String,
        required: [true, "To time must be provided"],
    },
    sessionDuration: {
        type: String,
        required: [true, "Duration must be provided"],
    },
    sessionTitle: {
        type: String,
        required: [true, "Session Title must be provided"],
    },
    sessionCharge: {
        type: String,
        required: [true, "Session Charge must be provided"],
    },
    date: {
        type: Date,
        required: [true, "Date must be provided"],
    },
})

export const ConsultantAvailability = models.availabilities || model("availabilities", consultantAvailablitySchema)

