

export const signUpQuery = (variables) => JSON.stringify({
    query: `mutation MyMutation($email: String = "", $password: String = "", $name: String = "") {
                insert_user_one(object: {email: $email, name: $name, password: $password}) {
                    email
                    name
                    password
                }
            }`,
    variables
})