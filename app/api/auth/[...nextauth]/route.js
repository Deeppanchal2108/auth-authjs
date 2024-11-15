import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth";

import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";

const prisma = new PrismaClient();
export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password :{label:"Password",type:"password"}
            },

             async authorize(credentials) {
                 const { email, password } = credentials;
                 const user = await prisma.User.findUnique({
                     where: {
                         email
                     }
                 })
                 if (!user) {
                     throw new Error("No user found")
                     
                 }
                 const isPasswordValid = await bcrypt.compare(password, user.password);
                 if (!isPasswordValid) {
                     throw new Error("Invalid password");
                 }
                 return user;
            }
        }
       
        )
    ],
    callbacks: {
        async token({ token, user }) {
            if (user) {
                token.user = user;
            }
            return token;
        },
             async session({ session, token }) {
            if (user) {
                session.user = token.user;
            }
            return session;
        }


    }
    ,
    secret:process.env.NEXTAUTH_SECRET
}
export default NextAuth(authOptions);