import { Model, Schema, models } from "mongoose"

const consultingSessionSchema = new Schema({
    consultant: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Consultant, Info cannot be empty"]
    },
    sessionType: {
        type: String,
        required: [true, "Session type must be provided"]
    },
    applicant: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Applicant Info must be provided"],
    },
    status: {
        enum: "pending" || "confirmed",
        default: "pending"
    },
    date: {
        type: Date,
        required: [true, "Time Must be provided"],
    },
    time: {
        type: String,
    }
})

export const consultingSession = models.consultingSession
    || new Model("consultingSession", consultingSessionSchema);


/*
const sessionSchema = new Schema({
    from: {
        type: String,
    },
    to: {
        type: String,
    },
    sessionCharge: {
        type: String,
    },
    status: {
        enum: ["pending" || "confirm"],
    },
    Date: {
        type: [Date],
        validate: {
            validate: (value: Date[]) => value.length >= 1,
            message: "Date Feild is required"
        }
    },
    consultant: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
}); */
