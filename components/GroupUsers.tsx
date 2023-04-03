import { useUserAdd } from '@/hooks/useUserAdd'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import React, { useState } from 'react'

function GroupUsers({ groupName, groupUsers }: any) {


  const [enabled, setEnabled] = useState(false)


  

//  if(isLoading) {
//   return <div className="">Loading...</div>
//  } else if(data?.data.insert_user_one) {
//   console.log("data-41", data )
// } else if(data?.data.errors){
//   alert("User already exists!")
// } 

  return (
    <div className='mt-2'>
      <h3 className='text-lg font-bold '>{groupName}</h3>
      {
        groupUsers.length === 0 ?
          <div className="">
            <p>No user added yet!</p>
          </div>
          :
          <ul className='shadow-md p-2'>
            {
              groupUsers.map((user: any) => (
                <div key={user.user.id} className="flex justify-between text-left mt-1">
                  <span>{user.user.name}</span>
                  <span>{user.user.role}</span>
                </div>
              ))
            }
          </ul>
      }



    </div>
  )
}

export default GroupUsers