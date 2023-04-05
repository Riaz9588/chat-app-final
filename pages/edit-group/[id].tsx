
import Loading from '@/components/Loading'
import { useAddUserToGroup } from '@/hooks/useAddUserToGroup'
import { useDeleteUserFromGroup } from '@/hooks/useDeleteUserFromGroup'
import { useGetGroupByOwner } from '@/hooks/useGetGroupByOwner'
import { useGetUsers } from '@/hooks/useGetUsers'
import { useUpdateGroupName } from '@/hooks/useUpdateGroupName'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'

function EditGroup() {
    const session: any = useSession()

    const router = useRouter()
    const { id } = router.query

    const [newGroupName, setNewGroupName] = useState("")
    const [groupData, setGroupData] = useState<any>({
        id: "",
        name: "",
        group_users: []
    })
    const [newGroupUsers, setNewGroupUsers] = useState<any>(null)
    const [allManagersAndMembers, setAllManagersAndMembers] = useState<any>([])

    const { isLoading, isError, error, data, isFetching }: any = useGetUsers()

    const { isLoading: getGroupLoading, error: getGroupError, data: groupInfo }: any = useGetGroupByOwner(id)

    const { isLoading: updateGroupNameLoading, isSuccess, error: updateGroupNameError, data: updatedNameGroupInfo, mutate: updateNameMutate }: any = useUpdateGroupName()

    const { isLoading: deleteUserLoading, isSuccess: deleteUserSuccess, error: deleteUserError, data: deleteUserData, mutate: deleteUserMutate }: any = useDeleteUserFromGroup()

    const { isLoading: addUserLoading, isSuccess: addUserSuccess, error: addUserError, data: addUserData, mutate: addUserMutate }: any = useAddUserToGroup()


    useEffect(() => {
        if (groupInfo) {
            let mappedUsers = groupInfo.group_users.map((u: any) => u.user)
            setGroupData(groupInfo)
            setNewGroupUsers(mappedUsers)
        }
        if (data) {
            let others = data.filter((user: any) => user.role !== 'administration')
            setAllManagersAndMembers(others)
        }
    }, [data, groupInfo])

    const setGroupUserHandler = (user: any, type: string) => {
        let parseUser = JSON.parse(user)
        if (type === 'add') {
            newGroupUsers.map((u: any) => {
                if (u.id === parseUser.id) {
                    alert("already selected")
                } else {
                    addUserMutate({ groupId: groupData.id, userId: parseUser.id })
                }
            })
        } else if (type === "remove") {
            if (parseUser.role === 'administration') {
                alert("Can't remove admin")
            } else {
                deleteUserMutate({ groupId: groupData.id, userId: parseUser.id })
            }
        }
    }


    const updateGroupHandler = async () => {
        // return console.log(newGroupUsers)
        if (groupData.name) {
            console.log(groupData)
            updateNameMutate(groupData)
            const submitUsersArray = newGroupUsers.map((user: any) => { return { user_id: user.id } })
        } else {
            alert("Enter group name")

        }
    }



    // if (isLoading || getGroupLoading || isFetching) return <div>"Loading..."</div>
    if (isLoading || getGroupLoading) return <Loading />


    if (isError || getGroupError) return <div>{console.log("error", error, getGroupError)}Error: {error?.message ? error.message : "Data fetching error!"}</div>

    return (
        <div className='shadow-lg p-4'>
            <h3 className='text-xl font-bold my-2'>Update group</h3>
            <input value={groupData?.name} className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' onChange={(e: any) => setGroupData({ ...groupData, name: e.target.value })} type="text" placeholder='Enter group name' /> <br />

            <select className='mt-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' onChange={(e) => setGroupUserHandler((e.target.value), "add")}>
                <option>Add group members</option>

                {
                    allManagersAndMembers.map((u: any) => (
                        <option key={u.id} value={JSON.stringify(u)}>{u.name} - {u.role}</option>
                    ))
                }
            </select><br />
            <div>
                <span className=' bg-red-400 rounded-full shadow-md px-3 py-[2px] m-1 text-white text-sm'>By clicking the cross button, you are going to remove user from group.</span><br></br>
                {
                    newGroupUsers?.map((user: any) => (
                        <button key={user.id} disabled className="relative py-1 pl-4 pr-8 m-1 mt-3 shadow-md rounded-full bg-gray-400 text-white font-sans font-semibold text-sm ">
                            {user.name} - {user.role}
                            <AiOutlineCloseCircle onClick={() => setGroupUserHandler(JSON.stringify(user), "remove")} className='crossButton absolute right-3 top-2 cursor-pointer hover:bg-red-600 rounded-full' />
                        </button>
                    ))
                }
                {
                    addUserLoading || deleteUserLoading ?
                    <Loading /> :
                    null
                }
            </div>

            <button className='mt-4 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent text-sm rounded' onClick={updateGroupHandler}>Update group</button>
        </div>
    )
}

export default EditGroup