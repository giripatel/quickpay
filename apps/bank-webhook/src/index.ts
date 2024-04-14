import express from 'express'
import db from '@quickpay/db/client'

const app = express();

app.use(express.json())
app.post('/hdfcWebhook',async (req,res) => {

    console.log(req.body);
    
    const paymentInformation = {
        // token is to identify the onramp transaction of provider
        token : req.body.token,
        userId: req.body.user_identifier,
        amount: Number(req.body.amount)
    }

    console.log("Reacing here .......!")
    // TODO : add transaction logic
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

    return res.status(200).json({
        message : "capurted"
    })
})

app.listen(3005)
