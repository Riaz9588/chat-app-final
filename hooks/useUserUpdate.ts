import { useMutation } from '@tanstack/react-query';
import axios from 'axios'


export const useUserUpdate = () => {
    
    // const queryClient = useQueryClient()

    return useMutation({
      mutationFn: (user: any) => {
        const graphqlQuery = {
            "operationName": "MyMutation",
            "query": `mutation MyMutation($id: Int = "", $name: String = "") {
                update_user_by_pk(pk_columns: {id: $id}, _set: {name: $name}) {
                  name
                  role
                  id
                }
              }              
            `,
            "variables": {
              "id": user.id,
              "name": user.name
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
        alert("Updated user info")
      }
    })
  }