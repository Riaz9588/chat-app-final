import { useQuery } from '@tanstack/react-query'
import axios from 'axios'


export const useGetChatByGroupId= (groupId: any) => {
    const graphqlQuery = {
        "operationName": "MyQuery",
        "query": `query MyQuery($_eq: Int = "") {
            chat(where: {group_id: {_eq: $_eq}}) {
              id
              message
              user {
                name
              }
            }
          }
          `,
          "variables": {
            "_eq": groupId
          }
    };
    return useQuery({
        queryKey: ['chats', groupId],
        queryFn: () =>
            axios({
                data: graphqlQuery
            })
                .then(res => {
                    return res.data.data.chat
                }),
                enabled: groupId ? true : false
        // refetchOnWindowFocus: false,
        // staleTime: 2000,
        // cacheTime: 5000, //It is used for caching data for specific minutes
    })
}