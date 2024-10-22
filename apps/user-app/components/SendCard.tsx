"use client"

import { Button } from "@repo/ui/button";
import Card from "@repo/ui/card";
import TextInput from "@repo/ui/textInput";
import { useState } from "react";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";
import {motion} from "framer-motion"
import { toast } from "sonner";
// import { useRecoilState } from "recoil";
// import { p2pUpdate } from "@repo/store/config";

const SendCard=()=>{
    const [number,setNumber]=useState("");
    const [amount,setAmount]=useState("");
    
    const cardVariants={
        hidden:{
            opacity:0,
            x:-40
        },
        visible:{
            opacity:1,
            x:0,
            transition:{
                type:"spring",
                duration:2
            }
        }
    }


    return (
        <motion.div initial="hidden" animate="visible" variants={cardVariants} className="flex overflow-hidden justify-center items-center">
            <Card additionalStyles="w-full bg-red-100 text-red-900" title="Send">
                <TextInput label="Number" placeholder="Enter mobile number.." onChange={(value)=>{setNumber(value)}}/>
                <TextInput label="Amount" placeholder="Enter amount.." onChange={(value)=>{setAmount(value)}}/>
                <Button color="bg-red-950" onClick={async()=>{
                    const res=await p2pTransfer(number,Number(amount))
                    console.log(res)
                    if(res?.message==="Transaction successful!!"){
                        toast("Transaction successful..")
                    }
                    else if(res?.message==="Error during transaction!!"){
                        toast("Error during transaction!")
                    }
                }}>Send</Button>
            </Card>
        </motion.div>
    )
};

export default SendCard;
