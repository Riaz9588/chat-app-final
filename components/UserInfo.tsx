import React from 'react'
import { useUserInfo } from '@/hooks/useUserInfo'
import { useSession } from 'next-auth/react'

function UserInfo({ id }: any) {
  const session: any = useSession()

  if (session.status === 'loading') return <div>"Loading..."</div>

  return (
    <div className='flex justify-between bg-slate-200 p-4 mt-1'>
      <p>Sign in as <span className='font-bold'>`{session.data.user.name}`</span></p>
      <p>Role: <span className='font-bold'>{session.data.user.role}</span></p>
    </div>
  )

}

export default UserInfo