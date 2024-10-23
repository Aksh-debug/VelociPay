"use server"

import { getServerSession } from "next-auth"
import { auth_options } from "../auth"
import prisma from "@repo/db/client";

export const p2pTransfer=async(to:string,amount:number)=>{
    const session=await getServerSession(auth_options);
    const from=session?.user?.id;
    if(!from){
        return {
            message:"Error while sending.."
        }
    }
    const toUser=await prisma.user.findFirst({
        where:{
            number:to
        }
    });

    console.log("from...........",from)

    if(!toUser){
        return {
            message:"User not found"
        }
    }
    try{
        await prisma.$transaction(async (tx:any)=>{

            await tx.$queryRaw`SELECT * from "Balance" WHERE "userId"=${from} FOR UPDATE` //locking
            const fromBalance=await tx.balance.findFirst({
                where:{
                    userId:from
                }
            })
            console.log(fromBalance?.amount,amount)
            if(!fromBalance || fromBalance.amount<amount){
                throw new Error("Insufficient funds!!")
            }
            await tx.balance.update({
                where:{
                    userId:from
                },
                data:{
                    amount:{
                        decrement:amount
                    }
                }
            })
            await tx.balance.update({
                where:{
                    userId:toUser.id
                },
                data:{
                    amount:{
                        increment:amount
                    }
                }
            })
            await tx.p2pTransfer.create({
                data:{
                    fromUserId:from,
                    toUserId:toUser.id,
                    amount,
                    timeStamp:new Date()
                }
            })
        })
        return {
            message:"Transaction successful!!"
        }
    }
    catch(e){
        console.log(e)
        return {
            message:"Error during transaction!!"
        }
    }
}