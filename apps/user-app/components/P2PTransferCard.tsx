"use client"

import Card from "@repo/ui/card";
import {motion} from "framer-motion";
import { useState } from "react";

interface p2pTranferProps{
    id:number;
    amount:number;
    timeStamp:Date;
    fromUserId:string;
    toUserId:string;
}

const P2PTransferCard=({p2pTransfers,sent}:{p2pTransfers:p2pTranferProps[],sent:boolean})=>{

    const [show,setShow]=useState(false);

    const cardVariants={
        hidden:{
            opacity:0,
            x:40
        },
        visible:{
            opacity:1,
            width:show?"44vw":"20vw",
            height:show?"24rem":"8rem",
            x:0,
            transition:{
                type:"spring",
                duration:2,
                stiffness:100,
                damping:20
            }
        }
    }

    const childVariants={
        hidden:{
            opacity:0,
            y:60
        },
        visible:{
            opacity:1,
            y:0,
            transition:{
                ease:"easeInOut",
                duration:2
            }
        }
    }
    if(p2pTransfers?.length===0){
        return 
    }

    return (
        <motion.div initial="hidden" animate="visible" variants={cardVariants} className={`relative p-2 border-[1.8px] flex flex-col justify-evenly gap-2 border-black border-b-[8px] border-e-[8px] rounded-2xl no-scrollbar overflow-y-scroll ${sent?"bg-red-200 text-red-900":"bg-[#CBDCEB] text-black"}`}>
                <p className="my-2 font-bold">{sent?"MONEY SENT":"MONEY RECEIVED"}</p>
                {show &&
                    p2pTransfers.map((p,idx)=>(
                        <div key={p?.id} className={`flex justify-between items-center ${sent?"bg-red-400":"bg-[#F3F3E0]"} rounded-md items-start border-b-[1.5px] p-2`}>
                            <div className="flex flex-col text-black justify-center items-center">
                                <p className="font-bold">{sent?"Sent":"Received"} INR</p>
                                <p className="text-xs text-zinc-600">{p?.timeStamp.toDateString()}</p>
                            </div>
                            <div>
                              <p className={`${sent?"bg-red-400":"bg-[#F3F3E0]"} font-bold`}>{sent?"-":"+"} Rs {p?.amount}</p>  
                            </div>
                        </div>
                    ))
                }
                <button onClick={()=>setShow(!show)} className="rounded-full bg-white border-black border-[1.5px] flex items-center justify-center font-bold text-3xl">{show?"-":"+"}</button>
        </motion.div>
    )
};

export default P2PTransferCard;