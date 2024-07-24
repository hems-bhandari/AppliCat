import { Metadata } from "next";
import UserAuthForm from "@/components/forms/user-auth-form";

export const metadata: Metadata = {
    title: "Authentication",
    description: "Authenticate to continue to Applicat",
    robots: {
        index: false,
        follow: false,
    },
};

export default function AuthenticationPage() {
    return (
        <div className="relative flex-col items-center justify-center h-screen md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="relative bg-gradient-to-r from-[#F4442A] to-[#F1314A]  flex-col hidden items-center justify-center h-full p-10 text-white bg-muted dark:border-r lg:flex bg">
                <img src="/catOnlyWhite.png" className="scale-x-[-1.2] scale-y-[1.2]" />
            </div>
            <div className="flex items-center h-full p-4 lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Sign in with Google
                        </h1>
                    </div>
                    <UserAuthForm />
                    <p className="px-8 text-sm text-center text-muted-foreground">
                        By signing in, you agree to our &nbsp;
                        <a
                            href="/terms_of_service"
                            target="_blank"
                            className="underline underline-offset-4 hover:text-primary"
                        >
                            Terms of Service
                        </a>
                        &nbsp; and &nbsp;
                        <a
                            href="/privacy_policy"
                            target="_blank"
                            className="underline underline-offset-4 hover:text-primary"
                        >
                            Privacy Policy
                        </a>
                        .
                    </p>
                </div>
            </div>
        </div>
    );
}
