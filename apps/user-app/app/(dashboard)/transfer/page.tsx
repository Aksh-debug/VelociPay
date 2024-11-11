"use server"

import { getServerSession } from "next-auth";
import AddMoneyCard from "../../../components/AddMoneyCard";
import BalanceCard from "../../../components/BalanceCard";
import { auth_options } from "../../lib/auth";
import prisma from "@repo/db/client";
import OnRampTransaction from "../../../components/OnRampTransaction";

const getBalance = async () => {
    const session = await getServerSession(auth_options);
    console.log(session)
    const balance = await prisma.balance.findFirst({
        where: {   
            userId: session?.user?.id
        }
    })
    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0
    }
}



const getOnRampTransactions = async () => {
    const session = await getServerSession(auth_options);
    const transactions = await prisma.onRampTransaction.findMany({
        where: {
            userId: session?.user?.id
        }
    })
    return transactions.map((t:any) => ({
        startTime: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider
    }))
}

const Transfer = async () => {
    const balance = await getBalance();
    const transactions = await getOnRampTransactions();
    return (
        <>
        <div className="flex flex-col px-10 py-5 mb-5 gap-10 bg-white rounded-xl">
        <h1 className="text-4xl font-bold text-gray-800">Transfer</h1>
            <div className="grid grid-cols-2 gap-10">
                <AddMoneyCard transactions={transactions} />
                <BalanceCard amount={balance.amount} locked={balance.locked} />
            </div>
            <div>
                <OnRampTransaction transactions={transactions}/>
            </div>
        </div>
        </>
    )
};

export default Transfer;




    
