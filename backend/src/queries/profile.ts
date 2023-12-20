import { gql } from "graphql-request";

export const getUserProfile = gql`
  query getUserProfile(
    $user: String!
    $app: String!
    $xp: String!
    $rewardToken: String!
  ) {
    user(id: $user) {
      id
      tokenBalances(where: { token_in: [$xp, $rewardToken] }) {
        balance
        token {
          id
          name
        }
      }
    }
    actions(
      where: {
        user_contains_nocase: $user
        star_contains_nocase: $app
      }
      orderBy: createdAt
      orderDirection: desc
    ) {
      id
      metadata {
        name
      }
      xp_rewarded
      createdAt
    }
    missions(
      where: {
        user_contains_nocase: $user
        star_contains_nocase: $app
      }
      orderBy: createdAt
      orderDirection: desc
    ) {
      id
      metadata {
        name
      }
      tokens {
        token {
          id
          name
        }
        amount_rewarded
      }
      badges {
        id
        tokenId
        badge {
          name
        }
      }
      createdAt
      xp_rewarded
    }
  }
`;
