import React from 'react'
import UserInfo from '@/components/UserInfo'
import { useSession } from 'next-auth/react'
import Groups from '@/components/Groups'


function Dashboard() {
  



  return (
    <div className="">
      <div className="">
        <UserInfo />
      </div>

      <div className='my-1'>
        <div className="p-2 rounded"><Groups/></div>
      </div>
    </div>
  )
}

export default Dashboard