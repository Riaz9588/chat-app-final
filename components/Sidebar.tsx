import { signIn, signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { RxDashboard } from 'react-icons/rx'

function Sidebar({ session }: any) {

  return (
    <div>

      <div className="py-4 mb-3 font-bold bg-blue-500 text-center">Menu</div>
      <Link href="/dashboard" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
        <RxDashboard />
        <span className="ml-3">Dashboard</span>
      </Link>
      {
        session.data?.user.role === 'administration' ?
          <Link href="/add-group" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
            <RxDashboard />
            <span className="ml-3">Add Group</span>
          </Link>
          :
          null
      }
      <Link href="/all-groups" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
        <RxDashboard />
        <span className="ml-3">My Groups</span>
      </Link>
      <Link href="/add-user" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
        <RxDashboard />
        <span className="ml-3">Add User</span>
      </Link>
      <Link href="/all-users" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
        <RxDashboard />
        <span className="ml-3">All Users</span>
      </Link>



      <div >
        <button className="py-4 font-bold fixed bottom-0 bg-slate-500 hover:bg-slate-400 w-64" onClick={() => signOut({ callbackUrl: '/auth/signin' })}>Log Out</button>
      </div>


    </div>
  )
}

export default Sidebar