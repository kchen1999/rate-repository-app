import { useMutation } from "@apollo/client";
import { AUTHENTICATE } from "../mutations";
import useAuthStorage from "./useAuthStorage";
import { useApolloClient } from "@apollo/client";


export const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const signIn = async ({ username, password }) => {
    // call the mutate function here with the right arguments
    const credentials = {username, password}
    const { data } = await mutate({ variables: {credentials}})
    authStorage.setAccessToken(data.authenticate.accessToken)
    apolloClient.resetStore();
    return { data }
  };

  return [signIn, result];
};