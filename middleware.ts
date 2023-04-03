// import { withAuth } from 'next-auth/middleware'

// export default withAuth({
//   callbacks: {
//     authorized: ({ token }) => {
//       return !!token
//     },
//   },
// })

// export const config = { matcher: ['/dashboard', '/favourite', '/profile'] }

export { default } from "next-auth/middleware"

export const config = { matcher: ["/dashboard"] }