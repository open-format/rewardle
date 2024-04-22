import { gql } from "graphql-request";

// GraphQL query to get missions by a specific user and app
export const getMissionsByUserAndRequirements = gql`
  query getMissionsByUserAndRequirements(
    $user: String!
    $app: String!
  ) {
    missions(
      where: { user: $user, app: $app }
      orderBy: "createdAt"
      orderDirection: "desc"
    ) {
      id
      metadata {
        name
      }
      tokens {
        token {
          id
        }
      }
      badges {
        id
        tokenId
      }
    }
  }
`;
