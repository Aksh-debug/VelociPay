"use client"

import { Appbar } from "@repo/ui/appbar"
import { signIn, signOut, useSession } from "next-auth/react"
import { usePathname, useRouter } from "next/navigation"
import { toast } from "sonner"

const AppbarClient=()=>{
    const router=useRouter();
    const session=useSession();
    // console.log(session)
    const pathname=usePathname();
    if(pathname=='/signin' || pathname=='/signup') return
    return (
        <div className="sticky top-0 z-10">
            <Appbar onSignin={signIn} onSignout={async()=>{
                const data=await signOut({redirect: false, callbackUrl: "/signin"});
                // console.log(data,'dataaaaaa')
                // console.log(res)
                toast("Logged out successfully..")
                router.push('/signin')
            }} user={session.data?.user}/>
        </div>
    )
}

export default AppbarClient;