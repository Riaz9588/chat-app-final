import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'


interface IUser {
  email?: string
  password?: string
}


function SignIn() {

  const [user, setUser] = useState<IUser>({
    email: '',
    password: ''
  })
  const session = useSession()
  const router = useRouter()

  const [loading, setLoading] = useState(true)

  useEffect(() => {

    if (session.data && session.status === 'authenticated') {
      router.push('/dashboard')
    } else {
      setLoading(false)
    }
  }, [router, session.data, session.status])

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  }


  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // signIn()
    signIn('credentials',
      {
        email: user.email,
        password: user.password,
        redirect: true,
        // The page where you want to redirect to after a 
        // successful login
        callbackUrl: `/dashboard`
      }
    )

  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-xs">
        <form onSubmit={submitHandler} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              User Email
            </label>
            <input onChange={onChangeHandler} required value={user.email} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="email" type="text" placeholder="User Email" />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input onChange={onChangeHandler} required value={user.password} className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" name="password" type="password" placeholder="******************" />
            {/* <p className="text-red-500 text-xs italic">Please choose a password.</p>   for input class error: border-red-500 */}
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Sign In
            </button>
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs cursor-pointer">
          <Link href="/auth/user-signup">Not have an account? Enter to sign-up page</Link>
        </p>
      </div>
    </div>
  )
}

export default SignIn