import { useMutation } from "@apollo/client";
import { DELETE_REVIEW } from "../mutations";
import { GET_USER } from "../queries";


export const useDeleteReview = () => {
  const [mutate, result] = useMutation(DELETE_REVIEW, {
    refetchQueries: [{query: GET_USER, variables: {includeReviews: true}}]
  });

  const deleteReview = async ({ id }) => {
    // call the mutate function here with the right arguments
    const { error } = await mutate({ variables: {id}})
    if(error) {
      console.log(error)
    }
    
    return 
  };

  return [deleteReview, result];
};