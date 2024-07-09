import React from 'react'
import AddMoney from '../../../components/AddMoney'
import BalanceCard from '../../../components/BalanceCard'
import { OnRampTransactions } from '../../../components/OnRampTransactions'
import { getBalance } from '../../../lib/actions/getBalance'
import { getOnRampTransactions } from '../../../lib/actions/getOnRampTransactions'


 async function page() {
 
    const balance = await getBalance();
    const transactions = await getOnRampTransactions();

    return <div className='w-screen'>
        <div className='text-4xl text-[#6a51a6] pt-8 mb-8 font-bold'>
            Trnasfer
        </div>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 p-4'>
            <div>
                <AddMoney />
            </div>
            <div>
                <BalanceCard amount={balance.amount} locked={balance.locked} />
                <div className='pt-4'>
                    <OnRampTransactions transactions={transactions}/>
                </div>
            </div>
        </div>
    </div>
}

export default page;