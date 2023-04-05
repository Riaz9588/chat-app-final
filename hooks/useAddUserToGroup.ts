
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios'


export const useAddUserToGroup = () => {
    
    const queryClient = useQueryClient()

    return useMutation({
      mutationFn: ({groupId, userId}: any) => {
        const graphqlQuery = {
            "operationName": "MyMutation",
            "query": `mutation MyMutation($user_id: Int = "", $group_id: Int = "") {
              insert_group_user_one(object: {user_id: $user_id, group_id: $group_id}) {
                group_id
                id
                user_id
              }
            }            
            `,
            "variables": {
              "user_id": userId,
              "group_id": groupId
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
        // alert("Added user to the group")
        queryClient.invalidateQueries(["group"])
      }
    })
  }