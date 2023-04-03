import Head from 'next/head'
import Image from 'next/image'
import LoginButton from '@/components/LoginBtn'
import { useSession, signIn, signOut } from "next-auth/react"

import axios from 'axios'
import setAxios from '@/utils/setAxios'
import { useUserLogin } from '@/hooks/useUserLogin'
import { useRouter } from 'next/router'
// console.log(process.env.apiUrl)

export default function Home() {

  const session = useSession()
  console.log(session)
  // const router = useRouter()


  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        
        
      </main>
    </>
  )
}
