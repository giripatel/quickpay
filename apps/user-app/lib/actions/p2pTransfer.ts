"use server"

import { getServerSession } from "next-auth";
import { authOptions } from "../auth"
import prisma from "@quickpay/db/client";

export async function p2pTransfer(to : string,amount : number) {
    
    const session = await getServerSession(authOptions);
    const userId = Number(session?.user.id);

    const toUser = await prisma.user.findUnique({
        where : {
            number : to
        }
    })

    if(!toUser){
        return {
            message : "user dosen't exist"
        }
    }

    const toUserId = toUser.id

    await prisma.$transaction(async (tx: any) => {
        
       const userBalance = await tx.balance.findFirst({
        where : {
            userId : userId
        },
        select : {
            amount : true
        }
       })

       if(userBalance && userBalance.amount < amount){
            return {
                message : "Insufficent balance"
            }
       }

       await tx.balance.update({
        where : {
            userId : toUserId
        },
        data : {
            amount : {
                increment : amount
            }
        }
       })

       await tx.balance.update({
        where : {
            userId : userId
        },
        data : {
            amount : {
                decrement : amount
            }
        }
       })

       await tx.p2pTransfer.create({
        
            data : {
                timestamp : new Date(),
                amount : amount,
                fromUserId : userId,
                toUserId : toUserId
            }
        
       })

    })

    return {
        message : "successfully sent"
    }
}