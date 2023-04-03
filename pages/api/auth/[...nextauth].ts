import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from 'axios'
import { JWT } from "next-auth/jwt";
import * as jsonwebtoken from "jsonwebtoken";


interface GithubProviderOptions {
  clientId: string;
  clientSecret: string;
}
interface GoogleProviderOptions {
  clientId: string;
  clientSecret: string;
}
// interface CredentialsProviderOptions {
//   name: string;
//   credentials: any;
//   user?: any
// }

export const authOptions: any = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.githubId,
      clientSecret: process.env.githubSecret,
    } as GithubProviderOptions),
    GoogleProvider({
      clientId: process.env.googleId,
      clientSecret: process.env.googleSecret
    } as GoogleProviderOptions),

    // ...add more providers here
    CredentialsProvider({
      name: "Credentials",
      // credentials: {
      //   email: { label: "Email", type: "email", placeholder: "jsmith@gmail.com" },
      //   password: { label: "Password", type: "password", placeholder: "*******" }
      // } as any,

      credentials: {} as any,

      async authorize(credentials, req) {
        const { email, password } = credentials as { email: string, password: string }
        const res = await axios({
          data: JSON.stringify({
            "query": `query MyQuery {
                      user(where: {email: {_eq: ${JSON.stringify(email)}}}) {
                        id
                        name
                        email
                        password
                        role
                      }
                    }`
          })
        })


        if (res.data.data.user.length) {
          // Any object returned will be saved in `user` property of the JWT
          console.log(res.data.data.user[0].password, password)
          if (res.data.data.user[0].password == password) {
            return {
              id: res.data.data.user[0].id,
              name: res.data.data.user[0].name,
              email: res.data.data.user[0].email,
              role: res.data.data.user[0].role,
            }
          } else {
            console.log("Invalid Credentials!")
            return null
            // throw new Error("Invalid Credentials!")
          }
          // return { id: 23, name: "Riaz", role: "sadddsada", email: "asddasd" }
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          console.log("No user exists!")
          return null
          // throw new Error("No User Exists!")
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      }
    })

  ],

  session: {
    strategy: "jwt",
    // maxAge: 30 * 24 * 60 * 60, // 30 Days
  },


  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }: unknown) {
      // Persist the OAuth access_token to the token right after signin
      // if (account) {    
      //    token.accessToken = account.access_token  //this access token has no `hasura-claims url. So we create custom token in `session` method and also generate the encoded-token`
      // }
      // console.log("jwt-data", token)

      try {
        let myToken = {
          ...token,
          ...user,
          "https://hasura.io/jwt/claims": {
            "x-hasura-allowed-roles": ["administration", "manager", "member"],
            "x-hasura-default-role": token.role,
            "x-hasura-role": token.role,
            "x-hasura-user-id": token.sub,
          }
        }

        return Promise.resolve(myToken);
      } catch (err) {
        console.log("err-jwt: ", err);
      }
    },


    async session({ session, token, user }: any) {
      // Send properties to the client, like an access_token from a provider.


      try {
        const encodedToken = jsonwebtoken.sign(token, process.env.NEXTAUTH_SECRET as string , {
          algorithm: "HS256"
        })

        session.accessToken = encodedToken
        session.user.id = token.sub
        session.user.role = token.role

        console.log("session-data", session)

        return Promise.resolve(session)

      } catch (err) {
        console.log("err-session: ", err);
      }
    }
  },

  //when needed to redirect to custom pages use belows code
  pages: {
    signIn: "/auth/signin", //Need to define custom login page (if using)
  },
}

export default NextAuth(authOptions)