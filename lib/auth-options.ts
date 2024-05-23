import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { getIfUserExistance } from "./userController";
import ConnectToDB from "./mongoose";
import Credentials from "next-auth/providers/credentials";
import { User } from "@/app/api/(db)/_models/userModel";
import { ObjectId } from "mongoose";
import { string } from "zod";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_AUTH_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_AUTH_SECRET ?? "",
        }),
        Credentials({
            name: "onboarding",
            credentials: {
                email: { type: "email" },
                name: { type: "text" },
                phonenumber: { type: "tel" },
                highschool: { type: "text" },
                education: { type: "text" },
                gpa: { type: "text" },
                sat: { type: "text" },
                image: { type: "text" },
            },
            authorize: async (inputCredentials) => {
                if (!inputCredentials) return null

                const email = inputCredentials.email;

                await ConnectToDB()

                //checking the existance in db
                const userInDb = await getIfUserExistance(email)

                if (userInDb) {
                    return {
                        ...userInDb,
                        id: userInDb._id.toString(),
                        onboarded: true,
                    }
                }

                // getting the user info from the onboarding screen
                const userData = {
                    email: inputCredentials.email,
                    name: inputCredentials.name,
                    image: inputCredentials.image,
                    phonenumber: inputCredentials.phonenumber,
                    highschool: inputCredentials.highschool,
                    education: inputCredentials.education,
                    gpa: inputCredentials.gpa,
                    sat: inputCredentials.sat,
                }

                // populating the database
                const newUser = await User.create({
                    ...userData,
                    type: "Applicant",
                }).then(res => res).catch((e) => {
                    console.log(e);
                    return null;
                });

                return {
                    ...newUser,
                    id: newUser._id.toString(),
                    onboarded: true,
                }
            },
        })
    ],
    callbacks: {
        async signIn({ user }) {
            if (user && user?.email) {
                const email = user.email;
                await ConnectToDB()

                //checking the existance in db
                const userInDb = await getIfUserExistance(email)


                // this means the user is found and has already been onboarded
                if (userInDb) {
                    Object.assign(user, {
                        ...userInDb,
                        onboarded: true,
                    });
                    return true;
                }

                // user is not onboarded
                Object.assign(user,
                    { onboarded: false }
                )
            }

            return true;
        },

        async jwt({ token, user }) {
            if (user) {
                token._doc = (user as any)?._doc;
                token.onboarded = (user as any)?.onboarded;
            }
            return token
        },

        async session({ session, token }) {
            if (token._doc) {
                Object.assign((session as any)?.user, {
                    ...(token as any)?._doc,
                    onboarded: (token as any).onboarded
                });
            }
            return session;
        },
    },
    pages: {
        signIn: "/auth/onboarding/"
    }
};
