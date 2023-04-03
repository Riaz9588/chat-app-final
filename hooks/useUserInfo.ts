import { useQuery } from '@tanstack/react-query'
import axios from 'axios'



export const useUserInfo = (id: number | string | any) => {
    console.log("id", id)
    const graphqlQuery = {
        "operationName": "MyQuery",
        "query": `query MyQuery($_eq: Int = "") {
            user(where: {id: {_eq: $_eq}}) {
              email
              id
              name
              role
            }
          }
          `,
        "variables": {
            "_eq": id
        }
      };
    return useQuery({
        queryKey: ['user', id],
        queryFn: () =>
            axios({
                data: graphqlQuery
            })
            .then(res => {
                return res.data.data.user[0]
            }),
                enabled: !!id

        // refetchOnWindowFocus: false,
        // staleTime: 2000,
        // cacheTime: 5000, //It is used for caching data for specific minutes
    })
}