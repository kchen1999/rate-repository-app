import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../mutations";


export const useSignUp = () => {
  const [mutate, result] = useMutation(CREATE_USER);

  const signUp = async ({ username, password }) => {
    // call the mutate function here with the right arguments
    const user = {username, password}
    const { data } = await mutate({ variables: {user}})
    return { data }
  };

  return [signUp, result];
};