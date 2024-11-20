"use client"
import React from 'react'
import { useSession ,signOut} from 'next-auth/react'
function page() {
  const { data: session } = useSession();
 
  if (!session?.user) {
    return <p>No session found</p>
  }
  if(session){
    console.log("Session on the client side kdk: ", session)
  }
  return (
    <div>
      <h1>{session.user.role == "Admin" ? "You are on the admin route" : session.user.role == "Doctor"?"You are on doctor route":"You are on Patient route "}</h1>
      <h3>Session Id  : {session.user.id||"Not getting id don`t know why"}</h3>
      <h3>Session Email : {session.user.email}</h3>
      <h3>Session Password : {session.user.password|| "Can`t show the password"} </h3>
      <h3>Session Role  : {session.user.role || "Unable to load the role"}</h3>
      <button className='bg-red-500 text-white rounded-lg p-2 m-4' onClick={()=>signOut({callbackUrl:"/signin"})}>
        LogOut 
      </button>
    </div>


  )
}

export default page
