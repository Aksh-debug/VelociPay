"use client"

import Card from "@repo/ui/card";
import {motion} from "framer-motion"

const BalanceCard = ({ amount, locked }: { amount: number, locked: number }) => {
    const cardVariants = {
        hidden: {
            opacity: 0,
            x: 40
        },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
                duration: 2
            }
        }
    }
    return (
        <motion.div className="" initial="hidden" animate="visible" variants={cardVariants}>
            <Card title="BALANCE" additionalStyles="h-full text-neutral-900">
                <div className="w-full flex justify-between bg-zinc-950 p-2 rounded-md text-white px-4">
                    <p className="font-bold">Unlocked Balance</p>
                    <p>{amount} INR</p>
                </div>
                <div className="flex w-full justify-between bg-zinc-950 p-2 rounded-md text-white px-4">
                    <p className="font-bold">Total Locked Balance</p>
                    <p>{locked / 100} INR</p>
                </div>
                <div className="flex w-full justify-between bg-zinc-950 p-2 rounded-md text-white px-4">
                    <p className="font-bold">Total Balance</p>
                    <p>{(amount + locked)} INR</p>
                </div>
            </Card>
        </motion.div>
    )
};

export default BalanceCard;