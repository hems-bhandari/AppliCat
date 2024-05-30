import { model, Schema, models } from "mongoose";

const UserSchema = new Schema({
    type: {
        type: String,
        enum: ["Admin", "Consultant", "Applicant"],
    },
    user: {
        ref: ["admin", "consultant", "applicant"],
        default: "applicant",
    }
});


export const Users = models.users || model("users", UserSchema);

