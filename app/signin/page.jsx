// app/signup/page.js

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { signIn } from "next-auth/react";
export default function SignUpPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
       
        try {
            const res = await signIn("credentials", {
                email,
                password,
                redirect: true,
                callbackUrl:"/dashboard"
            })
            console.log("response of the SignIn : ",res)

        } catch (error) {
            console.log("Error in client side : ", error)
        }
        setEmail("")
        setPassword("")
       
    };

    return (
        <div className='h-screen w-full bg-white flex justify-center items-center'>

            <div className='bg-black h-[400px] w-[300px] rounded-md px-8'>
                <h1 className="text-center mt-5 font-sans text-3xl font-semibold">Sign In Page </h1>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" className='bg-black  text-white outline-none  border-b border-white p-4 mb-2
         '  placeholder='Enter your Email : ' />
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="text" className='bg-black  text-white outline-none border-b border-white p-4 mb-4
         '  placeholder='Enter your Password : ' />
                <button className='bg-black text-white hover:bg-white hover:text-black transition-all duration-200
         border  py-2 px-5 rounded-lg' onClick={(e) => handleSubmit(e)}>Submit</button>
            </div>
        </div>
    );
}
