import axios from 'axios';
import Link from 'next/link';
import React, { useState } from 'react'
import { useGetGroupsByUser } from '@/hooks/useGetGroupsByUser';
import { CiEdit } from 'react-icons/ci';
import { BiGroup } from 'react-icons/bi';
import { useSession } from 'next-auth/react';
import Loading from '@/components/Loading';
import GroupUsers from '@/components/GroupUsers';
import Chat from '@/components/Chat';
import Image from 'next/image';
import noDataImage from '@/public/noData.png'
import queryImage from '@/public/query.png'




function Dashboard() {
  const session: any = useSession()
  const [groupUsers, setGroupUser] = useState<any>(null)
  const [groupName, setGroupName] = useState("")
  const [groupId, setGroupId] = useState("")

  const userRole = session?.data?.user.role

  const { isLoading, isError, error, data, isFetching }: any = useGetGroupsByUser(userRole)

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
    <div className='grid lg:grid-cols-3 gap-2 min-h-[300px] '>

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
                <div className="h-96 font-semibold text-center flex flex-col justify-center items-center">
                  <Image
                    src={noDataImage}
                    alt="Empty group"
                    width={250}
                    height={250}
                  />
                  <p className="font-semibold text-center leading-10">No group created yet! <br /> <Link href="/add-group" className='bg-blue-500 px-4 py-1 rounded text-white hover:bg-blue-600'>Add Group</Link></p>
                </div>
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
            !groupUsers ?
              <div className="h-96 font-semibold text-center flex flex-col justify-center items-center">
                <Image
                  src={queryImage}
                  alt="Empty user"
                  width={250}
                  height={250}
                />
                <p className="font-semibold text-center">Click on the group to see users</p>
              </div>
              :
              groupUsers?.length === 0 ?
                <div className="h-96 font-semibold text-center flex flex-col justify-center items-center">
                  <Image
                    src={queryImage}
                    alt="Empty user"
                    width={250}
                    height={250}
                  />
                  <p className="font-semibold text-center">No user added yet! <br /> Please add user from edit group</p>
                </div>
                :
                <GroupUsers groupName={groupName} groupUsers={groupUsers} />

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

export default Dashboard