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
    sessionTitle: {
        type: String,
        required: [true, "Session title must be provided"]
    },
    status: {
        type: String,
        enum: ["progress", "pending", "confirmed"],
        // progress means that the session is now in the process of being boooked by the applicant
        // pending means the sessions and the payment receipt has been uploaded and confirmed by the applicant.
        // confirmed means that the admin has confirmed the session.
        default: "progress",
    },
    sessionCharge: {
        type: Number,
        required: [true, "Session Charge must be provided"],
    },
    sessionDuration: {
        type: Number,
        required: [true, "Session Duration must be provided"]
    },
    date: {
        type: Date,
        required: [true, "Date Must be provided"],
    },
    time: {
        type: String, // should be hour:minutes and should represent the starting time
        required: [true, "Time must be provided"]
    },
    receipt: {
        type: String, // uploaded receipt url
    },
    updatedOn: {
        type: Date,
    },
    sessionEmail: {
        type: String,
    }
})

export const consultingSession = models.consultingSession
    || model("consultingSession", consultingSessionSchema);
