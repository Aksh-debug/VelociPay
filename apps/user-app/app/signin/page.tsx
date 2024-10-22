"use client"

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email(),
    phone: z.coerce.string().refine((value)=>/^[6-9]\d{9}$/.test(value),"Invalid phone number"),
    password: z.string().min(8, "Minimum 8 characters are required")
})

const Signin = () => {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "guest",
            email: "guest@gmail.com",
            phone:"9999999999",
            password: "guestpass"
        }
    })
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values)
        const data = await signIn("login", {
            phone: values.phone,
            name:values.name,
            password: values.password,
            email:values.email,
            redirect: false
        })
        // console.log(data)
        if (data?.ok) {
            toast('Logged In Successfully..')
            router.push('/dashboard')
        }
        else {
            toast("Something went wrong!")
        }
    }

    const handleGuestLogin=async()=>{
        const data=await signIn('login',{
            phone:9999999999,
            name:"guest",
            email:"guest@gmail.com",
            password:"guestpass",
            redirect:false
        })
        console.log('data....',data);
        if(data?.ok){
            toast("Logged In Successfully..")
            router.push('/dashboard')
        }
        else{
            toast("Something went wrong!")
        }
    }

    const variants = {
        hidden: {
            opacity: 0,
            y: 40
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                duration: 1
            }
        }
    }

    return (
        (
            <motion.div className="w-screen overflow-hidden h-screen bg-zinc-50 flex justify-center items-center">
                <motion.div initial="hidden" animate="visible" variants={variants} className="flex flex-col items-center w-[30%]">
                    <Card className="flex flex-col items-center w-full">
                        <CardHeader className="font-bold text-2xl">
                            Sign In
                        </CardHeader>
                        <CardContent className="w-full">
                            <Form {...form}>
                                <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                {/* <FormLabel>Email</FormLabel> */}
                                                <FormControl>
                                                    <Input type="email" placeholder="Enter your email" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="phone"
                                        render={({ field }) => (
                                            <FormItem>
                                                {/* <FormLabel>Phone Number</FormLabel> */}
                                                <FormControl>
                                                    <Input type="number" placeholder="Enter your phone number" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                {/* <FormLabel>Password</FormLabel> */}
                                                <FormControl>
                                                    <Input type="password" placeholder="Enter your password" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <Button className="w-full text-white p-5" variant="secondary" type="submit">Login</Button>
                                </form>
                            </Form>

                            <Button className="w-full my-4 p-5" variant="outline" onClick={ async() => {
                                try{
                                    await signIn('google',{callbackUrl:"/dashboard"})
                                }
                                catch(e){
                                    console.log(e)
                                }
                                
                            }}>
                                <Image className="mx-3" src="/google-logo.svg" height={15} width={15} alt="google-logo" />
                                <span>Sign In with Google</span>
                            </Button>
                                {/* <Button className="w-full text-white p-5" type="submit" onClick={handleGuestLogin}>Login as guest</Button> */}
                        </CardContent>
                        <CardContent className="text-sm">
                                Don&apos;t have an account?
                            <Link href="/signup" className="text-blue-700">{" "}Sign Up
                            </Link>
                        </CardContent>
                    </Card>
                </motion.div>
            </motion.div>
        )
    )
}


export default Signin;