import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { RxDashboard } from 'react-icons/rx'
import { AiOutlineUsergroupAdd, AiOutlineUserAdd } from 'react-icons/ai'
import { MdOutlineGroups } from 'react-icons/md'
import { HiOutlineUsers } from 'react-icons/hi'



function Sidebar({ session }: any) {

  return (
    <div className='font-semibold'>

      <div className="py-4 mb-3 bg-blue-500 text-center">Menu</div>

      <Link href="/dashboard" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
        <RxDashboard />
        <span className="ml-3">Dashboard</span>
      </Link>
      <Link href="/all-groups" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
        <MdOutlineGroups />
        <span className="ml-3">My Groups</span>
      </Link>
      {
        session.data?.user.role === 'administration' ?
          <>
            <Link href="/add-group" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
              <AiOutlineUsergroupAdd />
              <span className="ml-3">Add Group</span>
            </Link>
            <Link href="/all-users" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
              <HiOutlineUsers />
              <span className="ml-3">All Users</span>
            </Link>
            <Link href="/add-user" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
              <AiOutlineUserAdd />
              <span className="ml-3">Add User</span>
            </Link>
          </>
          :
          null
      }





      <div >
        <button className="py-4 font-bold fixed bottom-0 bg-slate-500 hover:bg-slate-400 w-64" onClick={() => signOut({ callbackUrl: '/auth/signin' })}>Log Out</button>
      </div>


    </div>
  )
}

export default Sidebar