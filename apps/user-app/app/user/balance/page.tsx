"use client"

import useBalance  from '@quickpay/store/useBalance'

export default () => {
    const balance = useBalance();

    return <div>
        {balance}
    </div>
}