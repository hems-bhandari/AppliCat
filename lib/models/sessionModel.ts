import {
    Schema,
    model,
    models
} from "mongoose"

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
        enum: ["progress" || "pending" || "confirmed"],
    },
    date: {
        type: String,
        required: [true, "Date Must be provided"],
    },
    time: {
        type: String, // should be hour:minutes and should represent the starting time
        required: [true, "Time must be provided"]
    },
})

export const consultingSession = models.consultingSession
    || model("consultingSession", consultingSessionSchema);
