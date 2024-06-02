import { model, Schema, models } from "mongoose";

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please Provide your username"]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Please, Provide an Email Address"]
    },
    image: {
        type: String,
    },
    phoneNumber: {
        type: Number,
        required: [true, "Please, Provide your Phone Number"],
    },
}, {
    discriminatorKey: 'userType',
    collection: "users"
});


export const User = models.users || model("users", UserSchema);

