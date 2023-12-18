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

export const getUserProfile = gql`
  query getUserProfile(
    $user: String!
    $app: String!
    $xp: String!
    $rewardToken: String!
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
      user {
        id
      }
      xp_rewarded
    }
    missions(
      where: { user: $user, star: $app }
      orderBy: "createdAt"
      orderDirection: "desc"
    ) {
      id
      metadata {
        name
      }
      user {
        id
      }
    }
    accessKeys(where: { currentOwner_contains_nocase: $user }) {
      id
    }
    user(id: $user) {
      tokenBalances(
        where: { or: [{ token: $xp }, { token: $rewardToken }] }
      ) {
        balance
        token {
          id
        }
      }
    }
  }
`;
