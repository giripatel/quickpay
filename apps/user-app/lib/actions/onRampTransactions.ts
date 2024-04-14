"use server"

import prisma from "@quickpay/db/client"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth"

 export async function onRampTransactions( amount : number, provider : string){

    const session = await getServerSession(authOptions);
    const userId = session?.user.id

    const token = Math.random().toString();

    const providerInformation = {
        amount : Number(amount),
        token : token,
        provider : provider
    };

     // if we have real bank
    // const token = axios.get("https://somebank.com/getToken",{
    //     amount : amount
    // })

    await prisma.onRampTransaction.create({
        data : {
            userId : Number(userId),
            token : providerInformation.token,
            provider : providerInformation.provider,
            amount : amount * 100,
            startTime : new Date(),
            status : "Processing"
        }
    })

}