import { useQuery } from '@tanstack/react-query'
import axios from 'axios'


export const useGetUsers = () => {

    const graphqlQuery = {
        "operationName": "MyQuery",
        "query": `query MyQuery {
            user {
              email
              id
              name
              role
            }
          }          
          `,
        "variables": {}
    };
    return useQuery({
        queryKey: ['users'],
        queryFn: () =>
            axios({
                data: graphqlQuery
            })
                .then(res => {
                    return res.data.data.user
                }),

        // refetchOnWindowFocus: false,
        // staleTime: 2000,
        // cacheTime: 5000, //It is used for caching data for specific minutes
    })
}