import { model, Schema, models } from "mongoose";

const AdminSchema = new Schema({
    phoneNumber: {
        type: Number,
        required: [true, "Please, Provide your Phone Number"]
    },
})

export const Admins = models.admins || model("admins", AdminSchema);
