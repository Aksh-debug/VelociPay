import CredentialsProvider  from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import db from "@repo/db/client";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@repo/db/client";


export const auth_options=({
    providers:[
        CredentialsProvider({
            id:"login",
            name:"Credentials",
            credentials:{
                phone:{label:"Phone Number", type:"text", placeholder:"123123123"},
                password:{label:"Password", type:"password", placeholder:"password"},
                email:{label:"Email", type:"email", placeholder:"email"},
            },
            async authorize(credentials:any){
                console.log('signin')
                if(!credentials.phone || !credentials.password){
                    return null
                }
                const hashedPassword=await bcrypt.hash(credentials.password,10);
                const existingUser=await db.user.findFirst({
                    where:{
                        number:credentials.phone
                    }
                });
                // console.log(existingUser)
                if(existingUser){
                    if(credentials.email!==existingUser.email){
                        console.error("Email not registered")
                        return null
                    }
                    const passwordValidation=await bcrypt.compare(credentials.password,existingUser.password);
                    // console.log(passwordValidation,credentials.password,existingUser.password)
                    if(passwordValidation){
                        return {
                            id:existingUser.id.toString(),
                            name:existingUser.name,
                            email:existingUser.number
                        }
                    }
                    return null
                }
                return null
            }
        }),
        CredentialsProvider({
            id:"register",
            name:"Credentials",
            credentials:{
                phone:{label:"Phone Number", type:"text", placeholder:"123123123"},
                password:{label:"Password", type:"password", placeholder:"password"},
                name:{label:"Name", type:"text", placeholder:"name"}, 
                email:{label:"Email", type:"email", placeholder:"email"}
            },
            async authorize(credentials:any){
                console.log('register')
                if(!credentials.phone || !credentials.password){
                    return null
                }
                const hashedPassword=await bcrypt.hash(credentials.password,10);
                const existingUser=await db.user.findFirst({
                    where:{
                        number:credentials.phone
                    }
                });
                console.log(existingUser)
                if(existingUser){
                    console.error("User already registered!!")
                   return null
                }
                try{
                    const user=await prisma.user.upsert({
                        where:{
                            number:credentials.phone
                        },
                        update:{},
                        create:{
                            number:credentials.phone,
                            email:credentials.email,
                            name:credentials.name,
                            password:hashedPassword,
                            Balance:{
                                create:{
                                    amount:0,
                                    locked:0
                                }
                            }
                        }
                    })
                    // console.log("user.....",user)
                    return {
                        id:user.id.toString(),  
                        name:user.name,
                        email:user.number
                    }
                   
                }
                catch(e){
                    console.log(e)
                }
                return null
            }
        }),
        GoogleProvider({
            clientId:process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
            clientSecret:process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET || "",
            authorization: {
                params: {
                  // Request additional scopes, including phone number
                  scope: "openid email profile https://www.googleapis.com/auth/user.phonenumbers.read",
                },
              },
        })
    ],
    secret:process.env.NEXT_PUBLIC_JWT_SECRET || "",
    callbacks:{
        async session({token,session,profile}:any){
            // console.log('token',token)
            session.user.id=token.sub;
            return session;
        },
        async signIn({user}:any){
            console.log('helllo',user)
            const isExistingUser=await prisma.user.findFirst({
                where:{
                    id:user?.id
                }
            })
            // console.log(isExistingUser)
            if(isExistingUser){
                return true
            }
            const hashedPassword=await bcrypt.hash(user?.name+"pass",10)
            const newUser=await prisma.user.upsert({
                where:{
                    id:user?.id
                },
                update:{},
                create:{
                    id:user?.id,
                    email:user?.email,
                    password:hashedPassword,
                    name:user?.name,
                    number:Math.floor(Math.random()*1000000000).toString(),
                    Balance:{
                        create:{
                            amount:0,
                            locked:0
                        }
                    }
                },
            })
            // console.log(newUser,'newwwwwwww...................')
            return true

        }
    },
    pages:{
        signIn:"/signin"
    }
})