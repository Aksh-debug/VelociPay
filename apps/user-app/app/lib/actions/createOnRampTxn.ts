"use server"

import { getServerSession } from "next-auth"
import { auth_options } from "../auth"
import prisma from "@repo/db/client";

const createOnRampTxn=async(amount:number,provider:string)=>{
    const session=await getServerSession(auth_options);
    const token=Math.random().toString();
    const userId=session?.user?.id;
    console.log(userId)
    if(!userId){
        return {
            message:"User not logged In"
        }
    }
    await prisma.onRampTransaction.create({
        data:{
            userId:userId,
            amount:amount,
            provider:provider,
            status:"Processing",
            startTime:new Date(),
            token:token
        }
    })
    return {
        message:"On ramp transaction added!!"
    }
}   

export default createOnRampTxn;