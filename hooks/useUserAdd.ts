
import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios'


interface PUser {
  email: string,
  password: string,
  name: string,
}




export const useUserAdd = (user: PUser | any) => {


  return useMutation({
    mutationFn: (newUser) => {
      const graphqlQuery = {
        "operationName": "MyMutation",
        "mutaion": `mutation MyMutation($role: String = "", $name: String = "", $email: String = "") {
          insert_user_one(object: {email: $email, name: $name, role: $role}) {
            name
            id
            role
            email
            password
          }
        }
        `,
        "variables": newUser
      };
      return axios({
        data: graphqlQuery
      })
      // .then(res => {
      //   return res.data.data.user[0]
      // }),
    }

  })


}
