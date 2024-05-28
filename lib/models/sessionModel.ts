import { Model, Schema, models } from "mongoose"

const consultingSessionSchema = new Schema({
    applicant: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Applicant Info must be provided"],
    },
    consultant: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Consultant, Info cannot be empty"]
    },
    sessionType: {
        type: String,
        required: [true, "Session type must be provided"]
    },
    status: {
        enum: ["pending" || "confirmed"],
        default: "pending"
    },
    date: {
        type: Date,
        required: [true, "Date Must be provided"],
    },
    time: {
        type: String, // should be hour:minutes
        required: [true, "Time must be provided"]
    },
})

export const consultingSession = models.consultingSession
    || new Model("consultingSession", consultingSessionSchema);
