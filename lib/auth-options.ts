import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { getIfUserExistance } from "./userController";
import ConnectToDB from "./mongoose";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_AUTH_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_AUTH_SECRET ?? "",
        }),
    ],
    callbacks: {
        async signIn({ user }) {
            if (user && user?.email) {
                const email = user.email;
                await ConnectToDB()

                //checking the existance in db
                const userInDb = await getIfUserExistance(email)

                if (!userInDb) return "/auth/onboarding"

                // // redirecting to the respective routes according to the usertype
                // if (userInDb.type === "Consultant")
                //     return "/consultant/dashboard"
                //
                // if (userInDb.type === "admin")
                //     return "/admin/dashboard"
                //
                // return "/dashboard"
            }

            return true;
        },
        async jwt({ token, user, profile }) {
            console.log({ user, token, profile })
            return token
        },
        async session({ session, token, user }) {
            console.log({ user, token, session })
            // populating the user from in here
            //
            // updating the new fileds
            session.user = token
            return session;
        },
    }
};
