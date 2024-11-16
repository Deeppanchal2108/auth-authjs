import { PrismaClient } from "@prisma/client";
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
                 const user = await prisma.user.findUnique({
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
                 console.log("Email in the auth options :", user.email)
                 console.log("Password  in the auth options :", user.password)
                 console.log("Role in the auth options :", user.role)
                 console.log("ID in the auth options :", user.id)
                 return {id :user.id,email:user.email , password :user.password, role:user.role};
            }
        }
       
        )
    ],
    callbacks: {
        async jwt({ token, user }) {
            console.log("user in the token : ", user)
            if (user) {
                token.user = user;
                token.email=user.email
                token.id = user.id;
                token.role = user.role;
                token.password = user.password;
            }
            return token;
        },
        async session({ session, token }) {
            console.log("Token ", token)
                 if (token.user) {
                session.user = token.user;
            }
            return session;
        }


    }
    ,
    secret:process.env.NEXTAUTH_SECRET
}
