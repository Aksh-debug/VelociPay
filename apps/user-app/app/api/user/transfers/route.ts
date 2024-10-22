import prisma from "@repo/db/client"
import { getServerSession } from "next-auth"
import { auth_options } from "../../../lib/auth";


export const GET=async()=>{
    try{
        const session=await getServerSession(auth_options);
        const senderId=session?.user?.id;
        const transfers=await prisma.p2pTransfer.findMany({
            where:{
                fromUserId:senderId
            },
            select:{
                amount:true,
                timeStamp:true
            },
            orderBy:{
                timeStamp:"asc"
            }
        });
        return Response.json(transfers)
    }
    catch(e){
        console.log(e)
        return Response.json({error:"Error fetching transfers!!"})
    }
}