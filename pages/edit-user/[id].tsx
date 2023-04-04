import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useGetGroupByOwner } from '@/hooks/useGetGroupByOwner'
import axios from 'axios'
import { useUserInfo } from '@/hooks/useUserInfo'
import Loading from '@/components/Loading'


function EditUser() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('administration')

    const router = useRouter()
    const { id } = router.query


    const { isLoading, isError, error, data, isFetching }: any = useUserInfo(id)



    const updateUser = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault()
        if (name && email && role) {
            return console.log(name, email, role)
            const graphqlQuery = {
                "operationName": "MyMutation",
                "query": `mutation MyMutation($id: Int = "", $name: String = "") {
                    update_group_by_pk(pk_columns: {id: $id}, _set: {name: $name}) {
                      name
                      id
                      owner_id
                    }
                  }                          
                  `,
                "variables": {
                    "id": id,
                    "name": ""
                }
            }
            const res = await axios({
                data: graphqlQuery
            })
            if (res.data.data.update_group_by_pk) {
                alert("Succesfully updated")
            } else {
                alert("something went wrong!")
            }
        } else {
            alert("empty field")


        }
    }

    useEffect(() => {
        if (data) {
            setName(data.name)
            setEmail(data.email)
            setRole(data.role)
        }
    }, [data])

    if (isLoading) return <Loading />

    if (isError) return <div>Error: {error.message}</div>

    return (
        <div className='p-4'>
            <h3 className='text-xl font-bold my-2'>Update user informations</h3>
            <form onSubmit={() => updateUser} className="">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                <input value={name} onChange={e => setName(e.target.value)} type="text" placeholder='Enter user name' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' /><br />
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input value={email} onChange={e => setEmail(e.target.value)} type="text" placeholder='Enter user email' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' /><br />
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your role</label>
                <select onChange={e => setRole(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value={role}>{role}</option>
                    <option value="administration">Administration</option>
                    <option value="member">Member</option>
                    <option value="manager">Manager</option>
                </select><br />
                <button type="submit" className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-1 border border-blue-500 hover:border-transparent text-sm rounded'>Update User</button>
            </form>
        </div>
    )
}

export default EditUser