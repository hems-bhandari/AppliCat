
import mongoose, { model, Schema, models } from "mongoose";

const ApplicantSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please Provide your username"]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Please, Provide an Email Address"]
    },
    phoneNumber: {
        type: Number,
        required: [true, "Please, Provide your Phone Number"],
    },
    highSchool: {
        type: String,
        required: [true, "Please, Provide your High School Name"],
    },
    education: {
        type: String,
        required: [true, "Please, Provide your education"],
    },
    gpa: {
        type: String,
        required: true,
    },
    sat: {
        type: Number,
        max: 1600,
        required: false,
    },
    bookedSessions: {
        type: [mongoose.Types.ObjectId],
        ref: "consultingSession",
        required: false,
    },
    image: {
        type: String,
    }
})
export const Applicants = models.applicants || model("applicants", ApplicantSchema);
