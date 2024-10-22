import {PrismaClient} from "@prisma/client";
import bcrypt from "bcrypt";

const prisma=new PrismaClient();

const main=async()=>{
    const guest=await prisma.user.upsert({
        where:{
            number:"9999999999"
        },
        update:{},
        create:{
            number:"9999999999",
            email:"guest@gmail.com",
            password:await bcrypt.hash('guestpass',10),
            name:'guest',
            Balance:{
                create:{
                    amount:2100,
                    locked:0
                }
            }
        }
    })
}

main().then(async()=>{
    await prisma.$disconnect();
})
.catch(async(e)=>{
    console.log(e)
    await prisma.$disconnect();
    process.exit(1);
})