import Loading from '@/components/Loading'
import { useGetGroupsByOwner } from '@/hooks/useGetGroupsByOwner'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import { BiGroup } from 'react-icons/bi'
import noDataImage from '@/public/noData.png'
import Image from 'next/image'


function AllGroups() {

    const session: any = useSession()
    const userRole = session?.data?.user.role


    const { isLoading, isError, error, data, isFetching }: any = useGetGroupsByOwner()

    const deleteGroupHandler = async (groupId: string) => {
        const graphqlQuery2 = {
            "operationName": "MyMutation",
            "query": `mutation MyMutation($id: Int = "") {
                delete_group_by_pk(id: $id) {
                  name
                  group_owner {
                    email
                    name
                    id
                  }
                }
              }
                           
              `,
            "variables": {
                "id": groupId
            }
        }

        const res = await axios({
            data: graphqlQuery2
        })
        console.log(res.data)
        if (res.data?.data?.delete_group_by_pk) {
            alert("successfully delete")
        } else {
            alert("something went wrong!")
        }
    }

    if (isLoading || session.status === "loading") return <Loading />

    if (isError) return <div>Error: {error.message}</div>

    return (
        <div>
            {
                data?.length ?
                    data.map((group: { name: string, id: string | number }) => (
                        <div key={group.id} className="bg-slate-200 p-3 rounded mt-1 flex justify-between items-center">
                            <h3 className='text-md font-semibold flex items-center'><BiGroup /> <span className='ml-3'>{group.name}</span></h3>
                            {
                                userRole === "administration" ?
                                    <div className='flex'>
                                        <Link href={`/edit-group/${group.id}`} className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-1 border border-blue-500 hover:border-transparent text-sm rounded flex items-center'><AiOutlineEdit />&nbsp;Edit group</Link>
                                        <button className='ml-2 bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white p-1 border border-red-500 hover:border-transparent text-sm rounded flex items-center' onClick={() => deleteGroupHandler(group.id as any)}><AiOutlineDelete />&nbsp;Delete group</button>
                                    </div>
                                    :
                                    userRole === "manager" ?
                                        <div className='flex'>
                                            <Link href={`/edit-group/${group.id}`} className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-1 border border-blue-500 hover:border-transparent text-sm rounded flex items-center'><AiOutlineEdit />&nbsp;Edit group</Link>
                                        </div>
                                        :
                                        null
                            }
                        </div>
                    ))
                    :
                    <div className="font-semibold text-center grid justify-center items-center">
                        <Image
                            src={noDataImage}
                            alt="Empty group"
                            width={500}
                            height={500}
                        />
                        <p className="font-semibold text-center leading-10">No group created yet! <br /> <Link href="/add-group" className='bg-blue-500 px-4 py-1 rounded text-white hover:bg-blue-600'>Add Group</Link></p>

                    </div>
            }
        </div>
    )
}

export default AllGroups