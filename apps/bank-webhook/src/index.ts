import express from "express";
import db from "@repo/db/client";

const app = express();

app.use(express.json());

app.post("/hdfcwebhook", async (req, res) => {
    const transaction=await db.onRampTransaction.findFirst({
        where:{
            token:req.body.token
        }
    });
    console.log(transaction,'transaction..........')
    if(transaction?.status!=="Processing"){
        res.status(403).json({
            message:"Trasaction already initiated!!"
        })
    }
else{
    const paymentInformation: {
        token: string;
        userId: string;
        amount: string;
      } = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount,
      };
    
      try {
        await db.$transaction([
          db.balance.update({
            where: {
              userId: paymentInformation.userId,
            },
            data: {
              amount: {
                increment: Number(paymentInformation.amount),
              },
            },
          }),
          db.onRampTransaction.update({
            where: {
              token: paymentInformation.token,
            },
            data: {
              status: "Success",
            },
          }),
        ]);
        res.json({
          message: "Captured",
        });
      } catch (e) {
        console.log(e);
        res.status(411).json({
          message: "Error while processsing webhook",
        });
      }
}
  
});

app.listen(3003);
