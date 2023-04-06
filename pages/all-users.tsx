import Loading from '@/components/Loading'
import { useDeleteUser } from '@/hooks/useDeleteUser'
import { useGetUsers } from '@/hooks/useGetUsers'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

function AllUsers() {

  const session: any = useSession()

  const { isLoading, isError, error, data, isFetching }: any = useGetUsers()
 
  const { isLoading: deleteUserDataLoading, isSuccess, error: deleteUserDataError, data: deleteUserData, mutate }: any = useDeleteUser()

  const deleteUser = (id: string | number) => {
    mutate(id)
  }

  if (isLoading || session.status === 'loading' || deleteUserDataLoading) return <Loading/>

  if (isError) return <div>Error: {error.message}</div>

  return (
    <div className=''>
      <h3 className='text-xl font-bold '>All Users</h3>
      <div className="overflow-scroll">
        <table className="text-left shadow rounded-md table-fixed w-full font-medium">
          <thead>
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
                <tr key={user.id} className="odd:bg-slate-100">
                  <td>{user.id}</td>
                  <td>{session.data.user.name === user.name ? <span className='text-white font-bold bg-slate-400 px-2 py-1 rounded-full'>{user.name} - (Signed-in)</span> : user.name}</td>
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