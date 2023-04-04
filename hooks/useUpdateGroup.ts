import { useQuery, useMutation, QueryClient, useQueryClient } from '@tanstack/react-query';
import axios from 'axios'


export const useUpdateGroup = () => {
    
    const queryClient = useQueryClient()

    return useMutation({
      mutationFn: (chatInfo: any) => {
        const graphqlQuery = {
            "operationName": "MyMutation",
            "query": `mutation MyMutation($message: String = "", $group_id: Int = "") {
              insert_chat(objects: {group_id: $group_id, message: $message}) {
                returning {
                  group_id
                  user_id
                  message
                  created_at
                  updated_at
                }
              }
            }
            `,
            "variables": {
              "group_id": chatInfo.groupId,
              "message": chatInfo.message
            }
          }
        return axios({
          data: graphqlQuery
        })
        // .then(res => {
        //   return res.data.data.user[0]
        // }),
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["chats"])
      }
    })
  }