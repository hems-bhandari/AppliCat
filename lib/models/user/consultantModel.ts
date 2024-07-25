import mongoose, { Schema } from "mongoose";
import { User } from "./userModel";

const consultantSchema = new Schema({
    phoneNumber: {
        type: Number,
        required: [true, "Please, Provide your Phone Number"],
    },
    highSchool: {
        type: String,
        required: [true, "Please, Provide your High School Name"],
    },
    university: {
        type: String,
        required: true,
        validate: {
            validator: (value: string[]) => value.length >= 1,
            message: "Please, Specify at least one University"
        }
    },
    availability: {
        type: [mongoose.Types.ObjectId],
        ref: 'availability'
    },
    classOf: {
        type: Number,
        required: [true, "Please, provide the classof Consultant"],
    }
})
export const Consultant = User.discriminators?.Consultant || User.discriminator("Consultant", consultantSchema);
