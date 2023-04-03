import { useQuery } from '@tanstack/react-query'
import axios from 'axios'


interface PUser {
    email: string,
    password: string
}

export const useUserLogin = (user: PUser | any) => {
    return useQuery({
        queryKey: ['user'],
        queryFn: () =>
        axios({
            data: JSON.stringify({
              "query":` query MyQuery {
                user(where: {email: {_eq: ${user.email}}}) {
                  id
                  name
                  email
                  role
                }
              }`
            })
          })
          .then(res => {
            console.log(res.data.data.user)
          }),
                
        refetchOnWindowFocus: false,
        // staleTime: 2000,
        // cacheTime: 5000, //It is used for caching data for specific minutes
    })
}
