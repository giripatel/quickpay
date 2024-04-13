"use client"

import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation';
import React, { ReactNode } from 'react'

const SidebarItem = ({href, title, icon} : {href : string, title : string, icon : ReactNode}) => {

    const router = useRouter();
    const pathname = usePathname();
    const selected = pathname === href

    return (
    <div className={`flex ${selected? "text-[#6a51a6]" : "text-slate-500"} cursor-pointer  p-2 pl-8`} onClick={ async () => (
        router.push(href)
    )}>
        <div className='pr-2'>{icon}</div>
        <div className={`font-bold ${selected? "text-[#6a51a6]" : "text-slate-500"}`}>{title}</div>
    </div>
  )
}

export default SidebarItem  
