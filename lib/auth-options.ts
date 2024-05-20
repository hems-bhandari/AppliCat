import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_AUTH_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_AUTH_SECRET ?? "",
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                // gets called after user is signedin.
                //
                // db calls to add or get the user if signed in already.
                //
                // redirecting based on the existance of the user
                console.log({ user })
                token.testing = "testing"
            }
            return token
        },
        async session({ session, token, user }) {
            // populating the user from in here
            //
            // updating the new fileds
            session.user = token
            return session;
        },
    }
};

