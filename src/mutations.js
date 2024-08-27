import { gql } from '@apollo/client';


export const AUTHENTICATE = gql `
mutation authenticate($credentials: AuthenticateInput!) {
  authenticate(credentials: $credentials) {
    accessToken
  }
}
`;

export const CREATE_REVIEW = gql `
mutation createReview($review: CreateReviewInput!) {
  createReview(review: $review) {
    userId,
    text,
    repositoryId,
    rating
  }
}
`;

export const CREATE_USER = gql`
mutation createUser($user: CreateUserInput!) {
  createUser(user: $user) {
    id,
    username
  }
}
`
export const DELETE_REVIEW = gql `
  mutation deleteReview($id: ID!) {
    deleteReview(id: $id)
  }
`