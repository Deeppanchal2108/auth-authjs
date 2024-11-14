import { PrismaClient,User } from "@prisma/client";
const prisma = new PrismaClient();
import { NextResponse } from "next/server";
import { hash } from "bcryptjs";

export  async function POST(req) {
    console.log("Entered in the post request")
    try {
        const { email, password, role
        } = await  req.json();
        console.log("Email : ", email)
        console.log("Password : ", password )
        console.log("role : ", role)
        const hashPassword = await hash(password, 10);

        const User1 = await prisma.User.create({
            data: {
                email: email,
                password: hashPassword,
                role:role
            }
        })
        console.log(User1)
        return NextResponse.json
        ({message:"Success"},{status:200})

    } catch (error) {
        console.log("Error :  ", error)

        return NextResponse.json({ message: "Failed" })
    }
    
}