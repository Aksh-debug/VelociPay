"use server"

import prisma from "@repo/db/client";
import P2PTransferCard from "../../../components/P2PTransferCard";
import SendCard from "../../../components/SendCard";
import { auth_options } from "../../lib/auth";
import { getServerSession } from "next-auth";

const getP2Ps=async()=>{
    const session=await getServerSession(auth_options);
    const p2pTransfers=await prisma.user.findFirst({
        where:{
            id:session?.user?.id
        },
        include:{
            sentTransfers:true,
            receiveTransfers:true
        }
    });
    return p2pTransfers;
}


const P2P=async()=>{
    const p2pTransfers=await getP2Ps();
    const sentTransfers=p2pTransfers?.sentTransfers;
    const receivedTransfers=p2pTransfers?.receiveTransfers;
    return (
        <div className="w-full min-h-full rounded-xl flex flex-col justify-center gap-5 p-5 bg-white">
            <h1 className="font-bold text-3xl font-sans">P2P Transfers</h1>
           <div className="flex gap-10">
            <P2PTransferCard sent={true} p2pTransfers={sentTransfers || []}/>
            <P2PTransferCard sent={false} p2pTransfers={receivedTransfers || []}/>
           
           </div>
            <SendCard/>
        </div>
    )
};

export default P2P;