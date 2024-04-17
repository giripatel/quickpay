import { Card } from '@repo/ui/card'
import React from 'react'
import { P2PTransactionsType } from '../../../packages/schema'

interface TransactionsType {
    transactions :  {
        receiverName :string,
        timeStamp : Date,
        receiverNumber : string
        amount : number
    }[]
}


export const P2PTransactions = ( { transactions } : P2PTransactionsType) => {

    if(!transactions.length){
        return <Card title='p2p Transactions'>
            <div className=''>
                No Transactions
            </div>
        </Card>
    }

  return (
    <Card title="p2p Transactions">
        <div>
            {transactions.map((t , index) => (
                <div key={index} className='flex justify-between w-80 pt-2'>
                    <div className=''>
                        <div className='text-lg'>Sent to: {t.receiverName}</div>
                        <div className='text-sm'>Number: {t.receiverNumber}</div>
                        <div className='text-sm text-gray-600'>{t.timeStamp.toDateString()}</div>
                    </div>
                    <div className='flex flex-col justify-center'>
                        <div className='text-lg'>Rs: {t.amount}</div>
                    </div>
                </div>
                
            ))}
        </div>
    </Card>
  )
}


