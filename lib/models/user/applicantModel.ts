
import mongoose, { model, Schema, models } from "mongoose";
import { User } from "./userModel";

const ApplicantSchema = new Schema({
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
})
export const Applicant = User.discriminators?.Applicant || User.discriminator("Applicant", ApplicantSchema);
