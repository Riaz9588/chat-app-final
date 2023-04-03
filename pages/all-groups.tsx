import { useGetGroupsByOwner } from '@/hooks/useGetGroupsByOwner'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useState } from 'react'

function AllGroups() {
    const session: any = useSession()


    const { isLoading, isError, error, data, isFetching }: any = useGetGroupsByOwner()

    const [groupUsers, setGroupUser] = useState(null)
    const [groupChats, setGroupChats] = useState(null)
    const [groupName, setGroupName] = useState(null)
    const [newGroupName, setNewGroupName] = useState(null)

    const getGroupDetails = async (group: any, e: any) => {

        // setGroupName(group.name)

        // const graphqlQuery1 = {
        //     "operationName": "MyQuery",
        //     "query": `query MyQuery($_eq: Int = "") {
        //     group_user(where: {group_id: {_eq: $_eq}}) {
        //       user {
        //         name
        //         email
        //         id
        //         role
        //       }
        //     }
        //   }
        //   `,
        //     "variables": {
        //         "_eq": group.id
        //     }
        // }
        // const res1 = await axios({
        //     data: graphqlQuery1
        // })
        // setGroupUser(res1.data.data.group_user)




        // const graphqlQuery2 = {
        //     "operationName": "MyQuery",
        //     "query": `query MyQuery($_eq: Int = "") {
        //     chat(where: {group_id: {_eq: $_eq}}) {
        //       id
        //       message
        //       user {
        //         name
        //       }
        //     }
        //   }
        //   `,
        //     "variables": {
        //         "_eq": group.id
        //     }
        // }
        // const res2 = await axios({
        //     data: graphqlQuery2
        // })
        // setGroupChats(res2.data.data.chat)

    }



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
        if(res.data.data.delete_group_by_pk) {
            alert("successfully delete")
        } else {
            alert("something went wrong!")
        }
    }

    if (isLoading) return <div>"Loading..."</div>

    if (isError) return <div>Error: {error.message}</div>

    return (
        <div>
            <div className='m-3'>
                {
                    data?.length ?
                        data.map((group: { name: string, id: string | number }) => (
                            <div key={group.id} className="bg-slate-200 p-3 rounded mt-1 flex justify-between items-center">
                                <h3 className='text-md'>{group.name}</h3>
                                <div>
                                    <Link href={`/edit-group/${group.id}`} className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-1 border border-blue-500 hover:border-transparent text-sm rounded'>Edit group</Link>
                                    <button className='ml-2 bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white p-1 border border-red-500 hover:border-transparent text-sm rounded' onClick={() => deleteGroupHandler(group.id as any)}>Delete group</button>
                                </div>
                            </div>
                        ))
                        :
                        <p>No groups created yet!</p>
                }
            </div>
        </div>
    )
}

export default AllGroups