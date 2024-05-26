import mongoose, { model, Schema, models } from "mongoose";

const baseUserSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please Provide your username"]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Please, Provide an Email Address"]
    },
    type: {
        type: String,
        enum: ["Admin", "Consultant", "Applicant"],
    },
    sessions: [{
        type: Schema.Types.ObjectId,
        // ref: 'Sessions'
    }],
    image: {
        type: String,
    }
});


const User = models.users || model("users", baseUserSchema);

const consultantAvailablitySchema = new Schema({
    from: {
        type: String,
    },
    to: {
        type: String,
    },
    sessionDuration: {
        type: String,
    },
    sessionCharge: {
        type: String,
    },
    Date: {
        type: Date,
    },
})

const consultantSchema = new Schema({
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
        type: [consultantAvailablitySchema],
        validate: {
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
        }
    },
})


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
        enum: "pending" || "confirm",
        default: "pending",
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
});


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
        required: false,
    },
    sat: {
        type: Number,
        max: 1600,
        required: false,
    },
    sessions: {
        type: [sessionSchema],
        validate: {
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
        }
    }
})

const AdminSchema = new Schema({
    phoneNumber: {
        type: Number,
        required: [true, "Please, Provide your Phone Number"]
    },
})

if (!User.discriminators?.Admin)
    User.discriminator("Admin", AdminSchema);

if (!User.discriminators?.Consultant)
    User.discriminator("Consultant", consultantSchema);

if (!User.discriminators?.Applicant)
    User.discriminator("Applicant", ApplicantSchema)

export {
    User
}
