import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import Chat from './Chat';
import GroupUsers from './GroupUsers';
import { useGetGroupsByUser } from '@/hooks/useGetGroupsByUser';
import { useMutation } from '@tanstack/react-query';
import { useChatAdd } from '@/hooks/useChatAdd';
import { CiEdit } from 'react-icons/ci';
import { useSession } from 'next-auth/react';

function GroupsMember() {
  const session: any = useSession()
  const [groupUsers, setGroupUser] = useState("")
  const [groupName, setGroupName] = useState("")
  const [groupId, setGroupId] = useState("")
  const [newGroupName, setNewGroupName] = useState("")


  const [reload, setReload] = useState(false)

  useEffect(() => {

  }, [reload])

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



  if (isLoading || session.status === 'loading') return <div>"Loading..."</div>

  if (isError) return <div>Error: {error.message}</div>

  return (
    <div className='grid grid-cols-3 p-4 gap-2 min-h-[300px] '>
      <div className="bg-slate-100 rounded-lg shadow-md p-4">
        <div className="flex justify-between">
          <h2 className='text-lg font-bold'>My Groups</h2>
          {
            session.data?.user.role === 'administration' ?
              <Link className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-1 border border-blue-500 hover:border-transparent text-sm rounded' href="/all-groups"><CiEdit/></Link>
              :
              null
          }
        </div>
        <div className="flex justify-between">
          <div className='mt-3'>
            {
              data.length ?
                data.map((group: { name: string, id: string | number }) => (
                  <div key={group.id} className="bg-slate-200 rounded  mt-1">
                    <li className='p-3 cursor-pointer mb-2 hover:bg-slate-300' onClick={(e) => getGroupDetails(group, e)}>
                      {group.name}
                    </li>
                  </div>
                ))
                :
                <p>No groups created yet!</p>
            }
          </div>
        </div>
      </div>
      <div className="bg-slate-100 rounded-lg shadow-md p-4">
        <h2 className='text-lg font-bold'>Group Users</h2>
        {
          groupUsers ?
            <GroupUsers groupName={groupName} groupUsers={groupUsers} />
            :
            <div className="">
              Click on the group to see users
            </div>
        }
      </div>
      <div className="bg-slate-100 rounded-lg shadow-md p-4 ">
        <h2 className='text-lg font-bold'>Chats</h2>
        <Chat groupId={groupId} />
      </div>

    </div>
  )
}

export default GroupsMember