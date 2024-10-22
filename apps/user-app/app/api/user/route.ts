import { getServerSession } from "next-auth"
import { auth_options } from "../../lib/auth"
import { NextResponse } from "next/server"
import prisma from "@repo/db/client"

export const GET=async()=>{
    const session=await getServerSession(auth_options)
    const senderId=session?.user?.id;
    const user=await prisma.user.findMany({ 
        where:{
            id:senderId
        },
                    
    })
    return NextResponse.json({user})
}