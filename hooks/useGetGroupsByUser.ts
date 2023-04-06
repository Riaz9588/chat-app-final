import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const useGetGroupsByUser= (userRole: string) => {
    const graphqlQuery = {
        "operationName": "MyQuery",
        "query": `query MyQuery {
            group(order_by: {created_at: desc}) {
              id
              name
              owner_id
              created_at
            }
          }
          `,
        "variables": {}
    };


    return useQuery({
        queryKey: ['groups'],
        queryFn: () =>
            axios({
                data:  graphqlQuery
            })
                .then(res => {
                    return res.data.data.group
                }),

        // refetchOnWindowFocus: false,
        // staleTime: 2000,
        // cacheTime: 5000, //It is used for caching data for specific minutes
    })
}