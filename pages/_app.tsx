import '@/styles/globals.css'
import type AppProps from 'next/app'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { SessionProvider } from "next-auth/react"
import setAxios from '@/utils/setAxios'
import { getSession } from "next-auth/react";
import Layout from '@/components/Layout'


setAxios(null)

const queryClient = new QueryClient()


export default function App({ Component, pageProps: { session, ...pageProps } }: any) {

  // getSession()
  // .then(res => {
  //   const secret = process.env.NEXTAUTH_SECRET
  //   const userInfo = res.accessToken
  //   console.log(secret)
  //   const encodedToken = jsonwebtoken.sign(userInfo, secret, {
  //     algorithm: "HS256",
  //   })
  // })

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
