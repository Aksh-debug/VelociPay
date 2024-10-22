"use server"

import { getServerSession } from "next-auth"
import { auth_options } from "./lib/auth"
import { redirect } from "next/navigation";

const App=async()=>{
  const session=await getServerSession(auth_options);
  // console.log('session',session)
  if(session?.user){
    redirect('/dashboard')
  }
  else{
    redirect('/signin')
  }
  
}

export default App;