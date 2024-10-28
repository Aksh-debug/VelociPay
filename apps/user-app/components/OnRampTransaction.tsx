"use client"

import Card from "@repo/ui/card";
import { motion } from "framer-motion"

const OnRampTransaction = ({ transactions }: {
    transactions: {
        time: Date,
        amount: number,
        status: string,
        provider: string
    }[]
}) => {
    if (!transactions.length) {
        return (
            <Card title="RECENT TRANSACTIONS">
                <div className="text-zinc-400">
                    No Recent Transactions
                </div>
            </Card>
        )
    }
    const cardVariants = {
        hidden: {
            opacity: 0,
            y: 40
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                duration: 2
            }
        }
    }
    return (
        <motion.div initial="hidden" animate="visible" variants={cardVariants}>
            <Card title="RECENT TRANSACTIONS" additionalStyles="bg-white text-black">
                <div className="">
                    {
                        transactions.map((t) => (
                            <div key={Math.random() + t?.status} className={`flex items-center ${t?.status === "Processing" ? "bg-[#F3F3E0]" : "bg-green-400"} my-5 h-14 transform duration-300 rounded-md justify-between px-4`}>
                                <div className="text-black">
                                    {t?.status !== "Processing" ? (
                                        <>
                                            <p className="font-bold">Received INR</p>
                                            <p className="text-xs">{t.time.toDateString()}</p>
                                        </>
                                    ) : (
                                        <p className="font-semibold">In Progress</p>
                                    )}
                                </div>
                                <p className={`text-black font-bold`}>₹ {t?.amount / 100}</p>
                            </div>
                        ))
                    }
                </div>
            </Card>
        </motion.div>
    )
};

export default OnRampTransaction;