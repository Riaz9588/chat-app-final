import { useQuery, useMutation, QueryClient, useQueryClient } from '@tanstack/react-query';
import axios from 'axios'


export const useUpdateGroupName = () => {
    
    // const queryClient = useQueryClient()

    return useMutation({
      mutationFn: (groupInfo: any) => {
        const graphqlQuery = {
            "operationName": "MyMutation",
            "query": `mutation MyMutation($id: Int = "", $name: String = "") {
              update_group_by_pk(pk_columns: {id: $id}, _set: {name: $name}) {
                id
                name
                owner_id
              }
            }
            
            `,
            "variables": {
              "id": groupInfo.id,
              "name": groupInfo.name
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
        alert("Updated group name")
      }
    })
  }