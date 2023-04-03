import { useQuery } from '@tanstack/react-query'
import axios from 'axios'


export const useGetGroupByOwner = (groupId: any) => {

  const graphqlQuery = {
    "operationName": "MyQuery",
    "query": `query MyQuery($id: Int = "") {
      group_by_pk(id: $id) {
        id
        name
        group_users {
          user {
            email
            id
            name
            role
          }
        }
      }
    }    
        `,
    "variables": {
      "id": groupId
    }
  };
  return useQuery({
    queryKey: ['group'],
    queryFn: () =>
      axios({
        data: graphqlQuery
      })
        .then(res => {
          return res.data.data.group_by_pk
        }),
        // enabled: groupId ? true : false
    // refetchOnWindowFocus: false,
    // staleTime: 2000,
    // cacheTime: 5000, //It is used for caching data for specific minutes
  })
}