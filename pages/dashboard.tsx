import React from 'react'
import UserInfo from '@/components/UserInfo'
import { useSession } from 'next-auth/react'
import Groups from '@/components/Groups'


function Dashboard() {

  return (
    <Groups />
  )
}

export default Dashboard