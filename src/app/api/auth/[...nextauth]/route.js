import LoginUser from "@/app/actions/auth/LoginUser";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Email & Password",
            credentials: {
                Email: { label: "Email", type: "email" },
                Password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const user = await LoginUser(credentials);

                if (user) {
                    return user
                }
                else {
                    return null
                }
            }
        })
    ],
    pages: {
        signIn: "/login"
    }
};

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }