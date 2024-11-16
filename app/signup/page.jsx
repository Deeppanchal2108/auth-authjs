// app/signup/page.js

"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";


export default function SignUpPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState(""); 
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const details = {
            email,password,role
        }
        try {
            const res = await axios.post("/api/auth/signup", details);
            console.log("Response : ", res)
            console.log(res.status)
            if (res.status==200) {
                router.push("/signin");
            }
        } catch (error) {
            console.log("Error in client side : ",error)
        }
        setEmail("")
        setPassword("")
        setRole("Patient")
    };

    return (
        <div className='h-screen w-full bg-white flex justify-center items-center'>
            
            <div className='bg-black h-[400px] w-[300px] rounded-md px-8'>
                <h1 className="text-center mt-5 font-sans text-3xl font-semibold">Sign Up Page </h1>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" className='bg-black  text-white outline-none  border-b border-white p-4 mb-2
         '  placeholder='Enter your Email : ' />
                <div className="flex flex-row gap-x-2">
                    <input type="radio" name="role" id="Patient"  value="Patient"
                        onClick={(e) => setRole(e.target.value)} />Patient 
                    <input type="radio" name="role" id="Doctor" value="Doctor"
                        onClick={(e) => setRole(e.target.value)} />Doctor 
                </div>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="text" className='bg-black  text-white outline-none border-b border-white p-4 mb-4
         '  placeholder='Enter your Password : ' />
                <button className='bg-black text-white hover:bg-white hover:text-black transition-all duration-200
         border  py-2 px-5 rounded-lg' onClick={(e)=>handleSubmit(e)}>Submit</button>
            </div>
        </div>
    );
}
