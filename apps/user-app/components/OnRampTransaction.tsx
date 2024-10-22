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
            <Card title="Recent Transactions">
                <div className="">
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
            <Card title="RECENT TRANSACTIONS" additionalStyles="bg-orange-100 text-black">
                <div className="py-1">
                    {
                        transactions.map((t) => (
                            <div key={Math.random() + t?.status} className={`flex items-center ${t?.status === "Processing" ? "bg-orange-200" : "bg-green-400"} my-2 hover:-translate-y-1 transition-all h-14 border-b-[1.8px] border-black transform duration-300 rounded-md justify-between p-2`}>
                                <div className="text-black">
                                    {t?.status !== "Processing" ? (
                                        <>
                                            <p className="font-bold">Received INR</p>
                                            <p className="text-xs">{t.time.toDateString()}</p>
                                        </>
                                    ) : (
                                        <p className="font-bold text-orange-700">In Progress</p>
                                    )}
                                </div>
                                <p className={`${t?.status === "Processing" ? "text-orange-700" : "text-green-900"} font-bold`}>₹ {t?.amount / 100}</p>
                            </div>
                        ))
                    }
                </div>
            </Card>
        </motion.div>
    )
};

export default OnRampTransaction;