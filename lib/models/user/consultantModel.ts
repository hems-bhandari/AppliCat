import mongoose, { model, Schema, models } from "mongoose";

const consultantSchema = new Schema({
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
    highSchool: {
        type: String,
        required: [true, "Please, Provide your High School Name"],
    },
    acceptedUniversity: {
        type: [String],
        required: true,
        validate: {
            validator: (value: string[]) => value.length >= 1,
            message: "Please, Specify at least one University"
        }
    },
    availability: {
        type: [mongoose.Types.ObjectId],
        ref: 'availability'
        /* validate: {
            validator: (value: any[]) => {
                // doesnot contain any value so no problem
                if (value.length === 0) return true;

                for (let object in value) {
                    const hasValue = Object.values(object).some(val => !val)
                    if (!hasValue) continue

                    const isValid = Object.values(object).every(val => val)

                    if (isValid)
                        continue

                    // contains some value in some object but doesnot have everything entered
                    return false
                }
                return true
            }
        } */
    },
    // all the booked sessions are going to be stored here
    bookedSessions: {
        type: [mongoose.Types.ObjectId],
        ref: "consultingSession",
        required: false,
    }
})
export const Consultants = models.consultants || model("consultants", consultantSchema);
