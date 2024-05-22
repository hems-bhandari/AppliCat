import NextAuth, { DefaultSession } from "next-auth";

declare module 'next-auth' {
    interface Session {
        user: {
            name: string,
            email: string,
            image: string,
            type: string,
            sessions: any[],
            _id: string,
        } & DefaultSession['user']
    }

    interface JWT {
        name: string,
        email: string,
        image: string,
        type: string,
        sessions: any[],
        _id: string,
    }
}
