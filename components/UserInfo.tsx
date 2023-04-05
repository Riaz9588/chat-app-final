import React from 'react'

function UserInfo({ session }: any) {
  
  return (
    <div className='flex justify-between bg-slate-200 p-4 mt-1'>
      <p>Signed in as <span className='font-bold'>{session.data?.user.name}</span></p>
      <p>Role: <span className='font-bold'>{session.data?.user.role}</span></p>
    </div>
  )

}

export default UserInfo