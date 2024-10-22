"use client"

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

interface SideBarItemsProps {
    href: string
    title: string
    icon: React.ReactNode
}

const SidebarItem = ({ href, title, icon }: SideBarItemsProps) => {

    const [hover,setHover]=useState(false)
    const router = useRouter();
    const pathName = usePathname();
    const selected = href === pathName;
    return (
        <div className={`${selected ? "w-full text-white  font-semibold" : " text-zinc-900"} hover:scale-110 hover:translate-x-1 transition-all transform delay-100 rounded-md p-2 cursor-pointer`} onClick={() => router.push(href)}>
            <div className="flex items-center gap-5">
                <div className={`${selected?"bg-[#0e141d] rounded-full":""} w-10 h-10 flex items-center justify-center`} onMouseLeave={()=>setHover(false)} onMouseOver={()=>setHover(true)}>{icon}</div>
               {/*  {hover && (  <p className="bg-white text-black rounded-md p-2 h-auto w-auto shadow-black shadow-md text-xs flex items-center justify-center">{title}</p>)} */}
            </div>
        </div>
    )
};

export default SidebarItem;