import { Schema } from "mongoose";
import { User } from "./userModel";

export const Admin = User.discriminators?.Admin ||
    User.discriminator("Admin", new Schema({})); 
