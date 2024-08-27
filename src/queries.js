import { gql } from '@apollo/client';

export const GET_REPOSITORIES_CREATED_AT = gql`
query repositories($first: Int, $after: String, $orderBy: AllRepositoriesOrderBy!, $searchKeyword: String!) {
  repositories(first: $first, after: $after, orderBy: $orderBy, searchKeyword: $searchKeyword) {
    totalCount,
    edges {
      node {
        id,
        name,
        ownerName,
        createdAt,
        fullName,
        reviewCount,
        ratingAverage,
        forksCount,
        stargazersCount,
        description,
        language,
        ownerAvatarUrl
      },
      cursor
    },
    pageInfo {
      hasNextPage,
      hasPreviousPage,
      startCursor,
      endCursor
    }
  }
}`;

export const GET_REPOSITORIES_RATING_AVERAGE = gql`
query repositories($first: Int, $after: String, $orderBy: AllRepositoriesOrderBy!, $orderDirection: OrderDirection!, $searchKeyword: String!) {
  repositories(first: $first, after: $after, orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword) {
    totalCount,
    edges {
      node {
        id,
        name,
        ownerName,
        createdAt,
        fullName,
        reviewCount,
        ratingAverage,
        forksCount,
        stargazersCount,
        description,
        language,
        ownerAvatarUrl
      },
      cursor
    },
    pageInfo {
      hasNextPage,
      hasPreviousPage,
      startCursor,
      endCursor
    }
  }
}`;

export const GET_USER = gql`
query getUser($includeReviews: Boolean = false){
  me {
    id,
    username,
    reviews @include(if: $includeReviews) {
      edges {
        node {
          id
          text
          rating
          createdAt
        }
      }
    }
  }
}
`
export const GET_REPOSITORY = gql `
query repository($id: ID!, $first: Int, $after: String) {
  repository(id: $id) {
    id
    fullName
    url,
    fullName,
    reviews(first: $first, after: $after) {
      edges {
        node {
          id
          text
          rating
          createdAt
          user {
            id
            username
          }
        }
      },
      pageInfo {
        hasNextPage,
        hasPreviousPage,
        startCursor,
        endCursor
      }
    },
    reviewCount,
    ratingAverage,
    forksCount,
    stargazersCount,
    description,
    language,
    ownerAvatarUrl
  }
}
`


// other queries...