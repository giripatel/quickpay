import { Card } from "@repo/ui/card"
import {OnRampTransactionType} from '../../../packages/schema'

enum OnRampStatus {
    Sucess,
    Pending,
    Failed
}

interface TransactionsType {
    transactions : {
        time : Date,
        amount : number,
        status : OnRampStatus,
        provider : string
    }[]
}

export const OnRampTransactions = ({
     transactions
    } : OnRampTransactionType) => {

    if(!transactions.length) {
        return <Card title="Recent Transactions">
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </Card>
    }

    return <Card title="Recent Transactions">

        <div className="pt-2">
            {transactions.map(t => <div className="flex justify-between">
                <div>
                    <div className="text-sm">
                        Recevied INR
                    </div>
                    <div className="text-slate-600 text-xs">
                        {t.time.toDateString()}
                    </div>
                </div>
                <div className="flex flex-col justify-center">
                    + Rs {t.amount / 100}
                </div>
            </div>)}
        </div>

    </Card>
}