import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { getIfUserExistance } from "./userController";
import ConnectToDB from "./mongoose";
import Credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_AUTH_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_AUTH_SECRET ?? "",
        }),
        // Credentials({
        //     name: "onboarding",
        //     credentials: {
        //         user
        //     },
        //     authorize: async (credentials) => {
        //         console.log(credentials)
        //         const user = {};
        //         return user;
        //     },
        //
        // })
    ],
    callbacks: {
        async signIn({ user }) {
            if (user && user?.email) {
                const email = user.email;
                await ConnectToDB()

                //checking the existance in db
                const userInDb = await getIfUserExistance(email)

                if (userInDb) {
                    Object.assign(user, userInDb);
                    return true;
                }
            }
            return true;
        },

        async jwt({ token, user }) {
            if (user) {
                token._doc = (user as any)?._doc
            }
            return token
        },

        async session({ session, token }) {
            if (token._doc)
                Object.assign((session as any)?.user, (token as any)?._doc);
            return session;
        },
    }
};
