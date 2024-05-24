import { model, Schema, models } from "mongoose";

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
    // TODO: YET TO FIND A WAY TO STORE AVAILABILITY
    // availability: {
    //     type: String,
    //     required: [true, "Please, tell us about your availablity"]
    // }
})

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
