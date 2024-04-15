import React from 'react'
import SendMoney from '../../../components/SendMoney'

const page = () => {
  return (
    <div className='w-full flex justify-center'>
      <div className='flex flex-col justify-center'>
      <div className='w-72'>
        <SendMoney />
      </div>
      </div>
    </div>
  )
}

export default page
