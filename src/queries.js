import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
query {
  repositories {
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
query {
  me {
    id,
    username
  }
}
`

// other queries...