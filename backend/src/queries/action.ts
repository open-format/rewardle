import { gql } from "graphql-request";

// Define the getActionsByUserAndRequirements query
export const getActionsByUserAndRequirements = gql`
  query getActionByUserAndRequirements(
    $user: String!
    $app: String!
  ) {
    actions(
      where: { user: $user, star: $app }
      orderBy: "createdAt"
      orderDirection: "desc"
    ) {
      id
      metadata {
        name
      }
      xp_rewarded
    }
  }
`;
