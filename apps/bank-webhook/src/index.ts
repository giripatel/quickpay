import express from 'express'
import db from '@quickpay/db/client'

const app = express();

app.use(express.json())
app.post('/hdfcWebhook',async (req,res) => {

    const paymentInformation = {
        // token is to identify the onramp transaction of provider
        token : req.body.token,
        userId: req.body.user_identifier,
        amount: Number(req.body.amount)
    }

    const isProcessing = await db.onRampTransaction.findFirst({
        where : {
            token : paymentInformation.token
        },select  : {
            status : true
        }
    })

    if(isProcessing && isProcessing?.status === "Processing"){
        return res.status(411).json({
            message : "Transaction is already completed"
        })
    }
    // TODO : add transaction logica
    await db.$transaction(async ( tx ) => {

        await db.balance.updateMany({
            where : {
                userId: Number(req.body.user_identifier),
            },
            data : {
               amount : {
                 increment : Number(paymentInformation.amount)
               }
            }
        })
    
        await db.onRampTransaction.update({
            where : {
                token : paymentInformation.token
            },
            data : {
                status : 'Success'
            }
        })
    })


    return res.status(200).json({
        message : "capurted"
    })
})

app.listen(3005)
