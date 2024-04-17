import { number, z } from 'zod' 

export const balanceCardScheam = z.object({
    amount : z.number(),
    locked : z.number()
});

// const  OnRampStatus= ["Sucess","Pending","Failed"] as const
export const onRampTransactionSchema = z.object({
    transactions : z.object({
            time : z.date(),
            amount : z.number(),
            status : z.enum(["Sucess","Pending","Failed"]),
            provider : z.string()
    }).array() 
})


const p2PTransactionsSchema = z.object({
    transactions : z.object({
        receiverName :z.string(),
        timeStamp : z.date(),
        receiverNumber : z.string(),
        amount : z.number()
    }).array()
})

export type BalanceCardType = z.infer<typeof balanceCardScheam>;
export type OnRampTransactionType = z.infer<typeof onRampTransactionSchema>;
export type P2PTransactionsType = z.infer<typeof p2PTransactionsSchema> 