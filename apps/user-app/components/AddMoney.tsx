"use client"

import React, { useState } from 'react'
import TextInput from '@repo/ui/TextInput';
import Select from '@repo/ui/Select';
import { Button } from '@repo/ui/button';
import { Card } from '@repo/ui/card';

const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
}, {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/"
}];

const AddMoney = () => {

    const [amount, setAmount] = useState(0)
    const [provider, setProvider] = useState()
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl)

  return (
    <Card title='Add Money'>
    <div className='w-full bg-yellow-400'>
        <TextInput label='Amount' placeholder='23456' onChange={(value) => (
            setAmount(Number(value))
        )} />        
        <div className='py-4 text-left'>
            Bank
        </div>
        <Select onSelect={(value) => {
            setRedirectUrl(SUPPORTED_BANKS.find(x => x.name === value)?.redirectUrl || "")
        }} options={SUPPORTED_BANKS.map(x => ({
            key : x.name,
            value : x.name
        }))}></Select>
        <div>
            <Button onClick={() => {
                window.location.href = redirectUrl || ""
            }}>Add Money</Button>
        </div>
    </div>
    </Card>
  )
}

export default AddMoney
