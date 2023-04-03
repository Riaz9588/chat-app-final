import setAxios from '@/utils/setAxios'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

function Layout({ children }: any) {

  const session: any = useSession()

  if (session.data && session.status === 'authenticated') {
    setAxios(session.data.accessToken as string)
  } else {
    setAxios(null)
  }

  const router = useRouter()

  if (router.pathname === '/auth/signin' || router.pathname === '/auth/user-signup') {
    return <>{children}</>
  }


  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-gray-200 text-white w-64 flex-none">
        <Sidebar session={session}/>
      </div>
      {/* Main content */}
      <div className="flex-grow">
        {/* Navbar */}
        <nav className="bg-gray-200 p-4">
          <Navbar />
        </nav>
        {/* Page content */}
        <div className="">{children}</div>
        {/* Footer */}
        <footer className="bg-gray-200 p-4">
          <Footer />
        </footer>
      </div>
    </div>
  )
}

export default Layout