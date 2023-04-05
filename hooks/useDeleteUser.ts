
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios'


export const useDeleteUser = () => {
    
    const queryClient = useQueryClient()

    return useMutation({
      mutationFn: (userId: any) => {
        const graphqlQuery = {
            "operationName": "MyMutation",
            "query": `mutation MyMutation($id: Int = "") {
                delete_user_by_pk(id: $id) {
                  email
                  name
                }
              }
              
            `,
            "variables": {
                "id": userId
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
        queryClient.invalidateQueries(["users"])
        alert("Deleted user from the system")
      }
    })
  }