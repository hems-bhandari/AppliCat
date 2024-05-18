import { model, Schema } from "mongoose";

const baseUserSchema = new Schema({
    firstName: {
        type: String,
        required: [true, "Please Provide your First Name"]
    },
    lastName: {
        type: String,
        required: [true, "Please Provide your Last Name"]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Please, Provide an Email Address"]
    },
    type: {
        type: String,
        enum: ["Admin" || "Consultant" || "Applicant"],
        default: "Applicant",
    },
    sessions: [{
        type: Schema.Types.ObjectId,
        ref: 'Sessions'
    }],
    image: {
        type: String,
    }
});


const UserModel = model("users", baseUserSchema);

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
    curriculum: {
        type: String,
        required: [true, "Please, Provide your Curriculum"],
    },
    grades: {
        type: String,
        required: false,
    },
    satScore: {
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

UserModel.discriminator("Admin", AdminSchema);
UserModel.discriminator("Consultant", consultantSchema);
UserModel.discriminator("Applicant", ApplicantSchema)

export {
    UserModel
}
