
import Loading from '@/components/Loading'
import { useGetGroupByOwner } from '@/hooks/useGetGroupByOwner'
import { useGetUsers } from '@/hooks/useGetUsers'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'

function EditGroup() {
    const session: any = useSession()

    const router = useRouter()
    const { id } = router.query

    const [newGroupName, setNewGroupName] = useState(null)
    const [groupData, setGroupData] = useState<any>({ name: "" })
    const [newGroupUsers, setNewGroupUsers] = useState<any>(null)
    const [allAdmins, setAllAdmins] = useState<any>([])
    const [allManagersAndMembers, setAllManagersAndMembers] = useState<any>([])

    const { isLoading, isError, error, data, isFetching }: any = useGetUsers()

    const { isLoading: getGroupLoading, error: getGroupError, data: groupInfo }: any = useGetGroupByOwner(id)

    useEffect(() => {
        if (groupInfo) {
        
            let mappedUsers = groupInfo.group_users.map((u: any) => u.user)

            setGroupData(groupInfo)

            setNewGroupUsers(mappedUsers)
        }
        if (data) {
            let admins = data.filter((user: any) => user.role === 'administration')
            let others = data.filter((user: any) => user.role !== 'administration')
            // setNewGroupUsers(admins)
            setAllManagersAndMembers(others)
        }
    }, [data, groupInfo])

    const setGroupUserHandler = (user: any, type: string) => {
        let parseUser = JSON.parse(user)
        console.log(parseUser)
        if (type === 'add') {
            // console.log(type, parseUser)
            newGroupUsers.map((u: any) => {
                if (u.id === parseUser.id) {
                    alert("already selected")
                } else {
                    const pushedArray = [...newGroupUsers, parseUser]
                    const uniqueArr = pushedArray.filter((obj, index, self) =>
                        index === self.findIndex((t) => t.id === obj.id)
                    );
                    setNewGroupUsers(uniqueArr)
                }
            })
        } else if (type === "remove") {
            if (parseUser.role === 'administration') {
                alert("Can't remove admin")
            } else {
                let filterUser = newGroupUsers.filter((userArg: any) => userArg.id !== parseUser.id)
                console.log(filterUser)
                setNewGroupUsers(filterUser)
            }
        }
    }


    const createGroupHandler = async () => {
        return console.log(newGroupUsers)
        if (!newGroupName) {
            alert("Enter group name")
        } else {
            const submitUsersArray = newGroupUsers.map((user: any) => { return { user_id: user.id } })
            const graphqlQuery3 = {
                "operationName": "MyMutation",
                "query": `mutation MyMutation($name: String = "", $data: [group_user_insert_input!] = {}) {
                    insert_group_one(object: {name: $name, group_users: {data: $data}}) {
                      name
                      group_users {
                        id
                        user {
                          email
                          name
                          role
                          id
                        }
                      }
                    }
                  }   
            `,
                "variables": {
                    "name": newGroupName,
                    "data": submitUsersArray
                }
            }

            const res3 = await axios({
                data: graphqlQuery3
            })
            console.log(res3.data)
            if (res3.data?.data?.insert_group_one) {
                alert("successfully added group")
            } else {
                alert("something went wrong!")
            }
        }
    }


    // if (isLoading || getGroupLoading || isFetching) return <div>"Loading..."</div>
    if (isLoading || getGroupLoading ) return <Loading />


    if (isError || getGroupError) return <div>{console.log("error", error, getGroupError)}Error: {error?.message ? error.message : "Data fetching error!"}</div>

    return (
        <div className='shadow-lg p-4'>
            <h3 className='text-xl font-bold my-2'>Update group</h3>
            <input value={groupData.name} className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' onChange={(e: any) => setNewGroupName(e.target.value)} type="text" placeholder='Enter group name' /> <br />
            <select className='mt-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' onChange={(e) => setGroupUserHandler((e.target.value), "add")}>
                <option>Select group members</option>

                {
                    allManagersAndMembers.map((u: any) => (
                        <option key={u.id} value={JSON.stringify(u)}>{u.name} - {u.role}</option>
                    ))
                }
            </select><br />
            <div>
                {
                    newGroupUsers?.map((user: any) => (
                        <button key={user.id} disabled className="relative py-1 pl-4 pr-8 m-1 shadow-md rounded-full bg-gray-400 text-white font-sans font-semibold text-sm ">
                            {user.name} - {user.role}
                            <AiOutlineCloseCircle onClick={() => setGroupUserHandler(JSON.stringify(user), "remove")} className='absolute right-3 top-2 cursor-pointer hover:bg-red-600 rounded-full' />
                        </button>

                    ))
                }
            </div>

            <button className='mt-4 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent text-sm rounded' onClick={createGroupHandler}>Update group</button>
        </div>
    )
}

export default EditGroup