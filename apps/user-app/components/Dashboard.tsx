"use client"

import { motion } from "framer-motion";
import RotatedCard from "./RotateCards";
import { BackgroundBeams } from "@/components/ui/background-beams";



const Dash = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 1,
                when: "beforeChildren"
            }
        }
    }
    const H1Variants={
        hidden:{
            opacity:0,
            y:-40
        },
        visible:{
            opacity:1,
            y:0,
            transition:{
                type:"spring",
                duration:2
            }
        }
    }
    const H2Variants={
        hidden:{
            opacity:0,
            y:40
        },
        visible:{
            opacity:1,
            y:0,
            transition:{
                type:"spring",
                duration:2
            }
        }
    }

    return (
        <>
      <motion.div className="bg-gradient-to-tr from-neutral-800 to-zinc-600 rounded-xl relative mt-8 mr-6 p-14 flex items-center h-[80vh]" variants={containerVariants} initial="hidden" animate="visible" style={{ perspective: 1200 }}>
                <div className=" flex flex-col gap-6 w-1/2">
                    <motion.div initial="hidden" animate="visible" variants={H1Variants} className="flex flex-col gap-2">
                        <p className="font-bold italic text-6xl text-white">Seamless Money Transfers, </p>
                        <p className="text-indigo-400 text-5xl italic font-bold">Reimagined!</p>
                    </motion.div>
                    <motion.div initial="hidden" animate="visible" variants={H2Variants}>
                        <p className="text-lg font-normal mt-3 text-zinc-300">Bank 24/7, Transfer Anytime!</p>
                        {/* <p className="text-white font-extralight">One app all things money.</p> */}
                    </motion.div>
                </div>
                <div className="w-1/2 absolute -top-5 right-20">
                    <RotatedCard url="/stripeCard.svg" properties={{ x: 0, y: 20, z: -20 }} index={1} additionalStyles="absolute z-10 w-[200px] h-[100px] top-60 right-10 rounded-3xl" />
                    <RotatedCard url="/code.svg" properties={{ x: 0, y: 6, z: -20 }} index={2} additionalStyles="absolute z-10 w-[200px] h-[100px] top-48 right-20 rounded-3xl" />
                    <RotatedCard url="/mastercard.svg" properties={{ x: -5, y: -15, z: -30 }} index={3} additionalStyles="absolute z-10 w-[200px] h-[100px] top-40 right-40 rounded-3xl " />
                    <RotatedCard url="/creditCard.svg" properties={{ x: 10, y: -40, z: -20 }} index={4} additionalStyles="absolute z-10 w-[200px] h-[100px] top-44 right-72 rounded-3xl" />
                </div>
            <BackgroundBeams className=""/>
            </motion.div>
        </>
    )
}

export default Dash;