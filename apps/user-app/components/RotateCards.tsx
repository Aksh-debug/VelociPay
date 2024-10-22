import { motion } from "framer-motion";
import Image from "next/image";


const RotatedCard = ({ properties, additionalStyles, index,url }: { url:string,properties: { x: number, y: number, z: number }, additionalStyles?: string, index: number }) => {
    const dashVariants = {
        hidden: {
            rotateX: 45,
            rotateZ: -30,
            rotateY: 25,
            opacity: 0
        },
        visible: {
            rotateX: properties?.x,
            rotateZ: properties?.y,
            rotateY: properties?.z,
            opacity: 1,
            transition: {
                duration: 1,
                type: "spring",
                stiffness: 50,
                dampping: 10,
                delay: index * 0.1
            }
        }

    }

    return (
        <motion.div style={{perspective:1200}} variants={dashVariants} initial="hidden" animate="visible" className={`${additionalStyles} ${index===5 ? "bg-gradient-to-r from-black to-transparent border-l-2 border-white":""}`}>
            <img className="shadow-xl shadow-black rounded-xl" src={url} alt="none"/>
        </motion.div>
    )
};

export default RotatedCard;
