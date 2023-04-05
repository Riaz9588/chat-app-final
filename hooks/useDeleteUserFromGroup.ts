
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios'


export const useDeleteUserFromGroup = () => {
    
    const queryClient = useQueryClient()

    return useMutation({
      mutationFn: ({groupId, userId}: any) => {
        const graphqlQuery = {
            "operationName": "MyMutation",
            "query": `mutation MyMutation($_eq: Int = "", $_eq1: Int = "") {
                delete_group_user(where: {group_id: {_eq: $_eq}, user_id: {_eq: $_eq1}}) {
                  returning {
                    group_id
                    user_id
                  }
                }
              }
            `,
            "variables": {
                "_eq": groupId,
                "_eq1": userId
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
        queryClient.invalidateQueries(["group"])
        alert("Deleted user from group")
      }
    })
  }