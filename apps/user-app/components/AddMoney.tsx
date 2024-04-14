"use client"

import React, { useState } from 'react'
import TextInput from '@repo/ui/TextInput';
import Select from '@repo/ui/Select';
import { Button } from '@repo/ui/button';
import { Card } from '@repo/ui/card';
import { onRampTransactions } from '../lib/actions/onRampTransactions';

const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
}, {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/"
}];

const AddMoney = () => {

    const [amount, setAmount] = useState(0)
    const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "")
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl)

  return (
    <Card title='Add Money'>
    <div className='w-full'>
        <TextInput label='Amount' placeholder='23456' onChange={(value) => (
            setAmount(Number(value))
        )} />        
        <div className='py-4 text-left'>
            Bank    
        </div>
        <Select onSelect={(value) => {
            setProvider(SUPPORTED_BANKS.find(x => x.name === value)?.name || "")
            setRedirectUrl(SUPPORTED_BANKS.find(x => x.name === value)?.redirectUrl || "")
        }} options={SUPPORTED_BANKS.map(x => ({
            key : x.name,
            value : x.name
        }))}></Select>
        <div className='flex justify-center pt-4'>
            <Button onClick={async () => {
            await onRampTransactions(amount, provider)
                window.location.href = redirectUrl || ""
            }}>Add Money</Button>
        </div>
    </div>
    </Card>
  )
}

export default AddMoney
