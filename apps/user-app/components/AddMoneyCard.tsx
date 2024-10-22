"use client"
import { Button } from "@repo/ui/button";
import Card from "@repo/ui/card";
import Select from "@repo/ui/select";
import TextInput from "@repo/ui/textInput";
import { useState } from "react";
import createOnRampTxn from "../app/lib/actions/createOnRampTxn";
import { motion } from "framer-motion";
import { toast } from "sonner";

const AddMoneyCard = () => {


    const SUPPORTED_BANKS = [{
        name: "HDFC Bank",
        redirectUrl: "https://netbanking.hdfcbank.com"
    }, {
        name: "Axis Bank",
        redirectUrl: "https://www.axisbank.com/"
    }];

    const cardVariants = {
        hidden: {
            opacity: 0,
            x: -40
        },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
                duration: 2
            }
        }
    }

    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    const [amount, setAmount] = useState(0);
    const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || '');

    return (
        <motion.div initial="hidden" animate="visible" variants={cardVariants} className="">
            <Card title="ADD MONEY" additionalStyles="bg-lime-200 text-lime-900">
                <TextInput color="lime" placeholder="Enter Amount" label="Amount" onChange={(value) => {
                    setAmount(Number(value))
                }} />
                <Select label="Bank" onSelect={(value) => {
                    setRedirectUrl(SUPPORTED_BANKS.find(x => x.name === value)?.redirectUrl || "")
                    setProvider(SUPPORTED_BANKS.find(x => x.name === value)?.name || "")
                }} options={SUPPORTED_BANKS.map((x) => (
                    {
                        key: x.name,
                        value: x.name
                    }
                ))} />
                <Button color="bg-lime-900" onClick={async () => {
                    try {
                        await createOnRampTxn(amount * 100, provider)
                        toast("Transaction Initiated")
                        window.location.href="/transfer"
                        // window.location.href = redirectUrl || "";
                    }
                    catch(e){
                        toast("Something went wrong!")
                    }
            }}>
                    ADD MONEY
                </Button>
            </Card>
        </motion.div>
    )
};

export default AddMoneyCard;