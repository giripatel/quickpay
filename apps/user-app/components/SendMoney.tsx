"use client"

import TextInput from '@repo/ui/TextInput'
import { Button } from '@repo/ui/button'
import { Card } from '@repo/ui/card'
import React, { useState } from 'react'
import { p2pTransactions } from '../lib/actions/p2pTransactions'

const SendMoney = () => {

    const [phone, setPhone] = useState('');
    const [amount, setAmount] = useState(0)
  return (
    <Card title='Send Money'>
        <div className='pt-2'>

                <TextInput label='Phone' placeholder='99889988899' onChange={(value) => {
                    setPhone(value);
                }} />
                <TextInput label='Amount Rs' placeholder='3233' onChange={(value) => {
                    setAmount(Number(value));
                }} />
    
        </div>
        <div className='flex justify-center pt-5'>
            <Button onClick={async () => {
                await p2pTransactions(phone,amount)
            }}>
                Send Money
            </Button>
        </div>
    </Card>
  )
}

export default SendMoney
