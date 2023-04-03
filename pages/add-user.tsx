
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import React, { useState } from 'react'

function AddUser() {
    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [role, setRole] = useState<string>('member')

    const { isLoading, isError, isSuccess, data, error, mutate } = useMutation({
        mutationFn: (newUser: any) => {
            const graphqlQuery = {
                "operationName": "MyMutation",
                "query": `mutation MyMutation($role: String = "", $name: String = "", $email: String = "") {
              insert_user_one(object: {email: $email, name: $name, role: $role}) {
                name
                id
                role
                email
                password
              }
            }
            `,
                "variables": newUser
            };

            return axios({
                data: graphqlQuery
            })
        }
    })

    console.log({ isLoading, isError, isSuccess, data, error })

    if (isLoading) {
        return <div className="">Loading ...</div>
    } else if (data) {
        if (data.data.data) {
            console.log("data-44", data.data.data)
        } else if (data.data.errors) {
            console.log("user exists!")
        }
    }

    const submitHandler = (e: any) => {
        e.preventDefault()
        if (name && email && role) {
            e.target.reset()
            setName("")
            setEmail("")
            setRole("member")
            //implement useuser hook
            mutate({ name, email, role })

        } else {
            alert("Enter name, email and role")
        }
    }

    return (
        <div className="p-4">
            <h3 className='text-xl font-bold my-2'>Add user</h3>
            <form onSubmit={submitHandler} >
                <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' onChange={e => setName(e.target.value)} type="text" placeholder='Enter user name' /><br />
                <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' onChange={e => setEmail(e.target.value)} type="text" placeholder='Enter user email' /><br />
                <select className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' onChange={e => setRole(e.target.value)}>
                    <option value="member">Member</option>
                    <option value="administration">Administration</option>
                    <option value="manager">Manager</option>
                </select><br />
                <button type="submit" className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-1 border border-blue-500 hover:border-transparent text-sm rounded'>Add User</button>
            </form>
        </div>
    )
}

export default AddUser