import { useUserSignUp } from '@/hooks/useUserAdd'
import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'


interface IUser {
  name?: string
  email?: string
  password?: string
  confirmPassword?: string
}


function UserSignup() {
  const session = useSession()
  const router = useRouter()

  console.log('session from user-signup', session)

  const [user, setUser] = useState<IUser>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [loading, setLoading] = useState(true)

  useEffect(() => {

    if (session.data && session.status === 'authenticated') {
      router.push('/dashboard')
    } else {
      setLoading(false)
    }
  }, [router, session.data, session.status])

  // const { isLoading, error, data } = useQuery({
  //   queryFn: () => 
  //      axios({
  //       data: JSON.stringify({
  //         "query": ` query MyQuery {
  //           user(where: {email: {_eq: "mdriaz@gmail.com"}}) {
  //             id
  //             email
  //             name
  //           }
  //         }`
  //       })
  //     })
  // })

  // console.log({ isLoading, error, data })

  // useEffect(() => {
  //   axios({
  //     data: JSON.stringify({
  //       "query": `query MyQuery {
  //                 user(where: {email: {_eq: ${JSON.stringify("mdriaz@gmail.com")}}}) {
  //                   id
  //                   name
  //                   email
  //                   role
  //                 }
  //               }`
  //     })
  //   })
  //   .then(res => {
  //     console.log(res);
  //   })
  // }, [])





  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  }


  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newUser = {
      name: user.name,
      email: user.email,
      password: user.password
    }

    const graphqlQuery = {
      "operationName": "MyMutation",
      "query": `mutation MyMutation($email: String = "", $name: String = "", $password: String = "") {
        insert_user(objects: {email: $email, name: $name, password: $password}) {
          returning {
            name
            id
            role
          }
        }
      }`,
      "variables": newUser
    };

    const res = await axios({
      data: graphqlQuery
    })

    if (res.data.errors) {
      alert("This email is already exists!")
    } else {
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
    // if(res.data.)

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
              User Name
            </label>
            <input onChange={onChangeHandler} required value={user.name} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="name" type="text" placeholder="User Name" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              User Email
            </label>
            <input onChange={onChangeHandler} required value={user.email} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="email" type="email" placeholder="User Email" />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input onChange={onChangeHandler} required value={user.password} className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="password" type="password" placeholder="******************" />
            {/* <p className="text-red-500 text-xs italic">Please choose a password.</p>   for input class error: border-red-500 */}
          </div>

          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Sign Up
            </button>
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs cursor-pointer">
          <Link href="/auth/signin">Already have an account? Enter to login page</Link>
        </p>
      </div>
    </div>
  )
}

export default UserSignup



//<div className="mb-6">
//<label className="block text-gray-700 text-sm font-bold mb-2">
//  Confirm Password
//</label>
//<input onChange={onChangeHandler} value={user.confirmPassword} className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" name="confirmPassword" type="password" placeholder="******************" />
//{/* <p className="text-red-500 text-xs italic">Please choose a password.</p>   for input class error: border-red-500 */}
//</div>