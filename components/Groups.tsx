import axios from 'axios';
import Link from 'next/link';
import React, { useState } from 'react'
import Chat from './Chat';
import GroupUsers from './GroupUsers';
import { useGetGroupsByUser } from '@/hooks/useGetGroupsByUser';
import { CiEdit } from 'react-icons/ci';
import { BiGroup } from 'react-icons/bi';
import { useSession } from 'next-auth/react';
import Loading from './Loading';

function GroupsMember() {
  const session: any = useSession()
  const [groupUsers, setGroupUser] = useState("")
  const [groupName, setGroupName] = useState("")
  const [groupId, setGroupId] = useState("")


  const { isLoading, isError, error, data, isFetching }: any = useGetGroupsByUser()

  // console.log({ isLoading, isError, error, data, isFetching })

  const getGroupDetails = async (group: any, e: any) => {

    setGroupName(group.name)
    setGroupId(group.id)

    const graphqlQuery1 = {
      "operationName": "MyQuery",
      "query": `query MyQuery($_eq: Int = "") {
        group_user(where: {group_id: {_eq: $_eq}}) {
          user {
            name
            email
            id
            role
          }
        }
      }
      `,
      "variables": {
        "_eq": group.id
      }
    }
    const res1 = await axios({
      data: graphqlQuery1
    })
    setGroupUser(res1.data.data.group_user)
  }



  if (isLoading || session.status === 'loading') return <Loading />

  if (isError) return <div>Error: {error.message}</div>

  return (
    <div className='grid grid-cols-3 gap-2 min-h-[300px] '>

      {/* Column-1 starts */}
      <div className="bg-slate-100 rounded-lg shadow-md">
        <div className="flex justify-between bg-blue-500 text-center p-2 rounded-t-lg text-white">
          <h2 className='text-lg font-bold'>My Groups</h2>
          {
            session.data?.user.role === 'administration' ?
              <Link className=' hover:bg-blue-500  font-semibold text-white py-1 px-1 border border-white hover:border-transparent text-sm rounded' href="/all-groups"><CiEdit /></Link>
              :
              null
          }
        </div>
        <div className="flex justify-between p-2">
          <div className='w-full'>
            {
              data.length ?
                data.map((group: { name: string, id: string | number, created_at: string }) => (
                  <div onClick={(e) => getGroupDetails(group, e)} key={group.id} className='p-3 cursor-pointer bg-slate-200 rounded mb-2 hover:bg-slate-300 font-medium flex justify-between items-center'>
                    <div className=' flex items-center'>
                      <BiGroup /> <span className='ml-3'>{group.name}</span>
                    </div>
                    <div className='text-xs'>{new Date(group.created_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', day: '2-digit', year: 'numeric' })}</div>
                  </div>
                ))
                :
                <p>No groups created yet!</p>
            }
          </div>

        </div>

      </div>
      {/* Column-1 ends */}


      {/* Column-2 starts */}
      <div className="bg-slate-100 rounded-lg shadow-md">
        <h2 className='text-lg font-bold bg-blue-500 text-center p-2 rounded-t-lg text-white'>Group Users</h2>
        <div className="p-2">
          {
            groupUsers ?
              <GroupUsers groupName={groupName} groupUsers={groupUsers} />
              :
              <div className="font-semibold text-center">
                Click on the group to see users
              </div>
          }
        </div>
      </div>
      {/* Column-2 ends */}


      {/* Column-3 starts */}
      <div className="bg-slate-100 rounded-lg shadow-md">
        <h2 className='text-lg font-bold bg-blue-500 text-center p-2 rounded-t-lg text-white'>Chats</h2>
        <div className="p-2">
          <Chat groupId={groupId} />
        </div>
      </div>
      {/* Column-2 ends */}

    </div>
  )
}

export default GroupsMember