import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../../../lib/auth';
import prisma from '@quickpay/db/client';
import { P2PTransactions } from '../../../components/P2PTransactions';

const getTransactions = async () =>{
  const session = await getServerSession(authOptions);
  const userId = Number(session?.user.id);

  const transactions = await prisma.p2pTransfer.findMany({
    where : {
      fromUserId : userId
    },
    select : {
      toUser : {select : {
        name : true,
        number : true
      }},
      timestamp : true,
      amount : true

    }
  })

  return transactions.map((t: any) => ({
            receiverName : t.toUser.name || "",
            timeStamp : t.timestamp,
            receiverNumber : t.toUser.number,
            amount : t.amount
          }));
}

const page = async () => {

  const transactions = await getTransactions();

  return (
    <div className='flex w-full justify-center pt-24'>
      <div className='w-96'>
        <P2PTransactions transactions={transactions} /> 
      </div> 
    </div>
  )
}

export default page
