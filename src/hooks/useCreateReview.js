import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../mutations";


export const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const createReview = async ({ repositoryName, ownerName, rating, text }) => {
    // call the mutate function here with the right arguments
    const review = {repositoryName, ownerName, rating, text}
    const { data } = await mutate({ variables: {review}})
    return { data }
  };

  return [createReview, result];
};