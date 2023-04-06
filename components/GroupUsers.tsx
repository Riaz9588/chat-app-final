import Image from 'next/image'
import React, { useState } from 'react'
import noDataImage from '@/public/noData.png'


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
    <div className=''>
      <h3 className="flex justify-between text-lg font-medium">{groupName}</h3>
      {
        groupUsers.length === 0 ?
          <div className="font-semibold text-center grid justify-center items-center">
            <Image
              src={noDataImage}
              alt="Empty group"
              width={250}
              height={250}
            />
            <p className="font-semibold text-center">No user added yet! <br /> Please add user from edit group</p>
          </div>
          :
          <ul className='shadow-md p-2'>
            {
              groupUsers.map((user: any) => (
                <div key={user.user.id}>
                  <div className="flex justify-between text-left mt-1">
                    <span className='font-semibold'>{user.user.name}</span>
                    <span>{user.user.role}</span>
                  </div>
                  <hr className='h-1 w-full' />
                </div>
              ))
            }
          </ul>
      }



    </div>
  )
}

export default GroupUsers