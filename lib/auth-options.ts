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

                console.log({ userInDb })
                // it means user already has a account
                Object.assign(user, userInDb);
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
            Object.assign((session as any)?.user, (token as any)?._doc);
            return session;
        },
    }
};
