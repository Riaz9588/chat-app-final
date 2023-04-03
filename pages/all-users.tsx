import { useGetUsers } from '@/hooks/useGetUsers'
import Link from 'next/link'
import React from 'react'

function AllUsers() {

  const { isLoading, isError, error, data, isFetching }: any = useGetUsers()

  const deleteUser = (id: string | number) => {
    alert(id)
  }

  if (isLoading) return <div>"Loading..."</div>

  if (isError) return <div>Error: {error.message}</div>
  console.log(data)
  return (
    <div className='m-4'>
      <h3 className='text-xl font-bold my-2'>All Users</h3>
      <div className="p-4">
        <table className="w-full text-left shadow rounded-md">
          <thead className='bg-blue-400'>
            <tr >
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th className='my-3 flex'>Actions</th>

            </tr>
          </thead>
          <tbody>
            {
              data.map((user: any) => (
                <tr key={user.id} className="odd:bg-slate-300">
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  {
                    user.role === 'administration' ?
                      <td className='my-2 flex'>
                        <button disabled className="py-1 px-4 shadow-md no-underline rounded-full bg-gray-300 text-white font-sans font-semibold text-sm border-red  hover:text-white focus:outline-none active:shadow-none">No action for admin</button>
                      </td>
                      :
                      <td className="select-none flex my-2">
                        <Link href={`/edit-user/${user.id}`} className="py-1 px-4 shadow-md no-underline rounded-full bg-blue-500 text-white font-sans font-semibold text-sm border-blue  hover:text-white hover:bg-blue-700 focus:outline-none active:shadow-none mr-2">Edit</Link>
                        <button onClick={() => deleteUser(user.id)} className="py-1 px-4 shadow-md no-underline rounded-full bg-red-500 text-white font-sans font-semibold text-sm border-red hover:text-white hover:bg-red-700 focus:outline-none active:shadow-none">Delete</button>
                      </td>
                  }
                </tr>
              ))
            }

          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AllUsers