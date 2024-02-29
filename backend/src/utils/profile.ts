import { GetUserProfileResponse } from "../../@types";
import { getUserProfile } from "../queries";
import { sdk } from "../services/SDK";
import { weiToNumber } from "./formatting";

export async function getOnChainProfile(userAddress: string) {
  const response =
    await sdk.subgraph.rawRequest<GetUserProfileResponse>(
      getUserProfile,
      {
        user: userAddress.toLowerCase(),
        app: sdk.appId.toLowerCase(),
        xp: (process.env.XP_TOKEN_ID as string).toLowerCase(),
        rewardToken: (
          process.env.REWARD_TOKEN_ID as string
        ).toLowerCase(),
      }
    );

  const XPBalance = response.user?.tokenBalances.find(
    (token) =>
      token.token.id === process.env.XP_TOKEN_ID?.toLowerCase()
  );
  const RewardTokenBalance = response.user?.tokenBalances.find(
    (token) =>
      token.token.id === process.env.REWARD_TOKEN_ID?.toLowerCase()
  );

  return {
    xp_balance: weiToNumber(XPBalance?.balance),
    reward_token_balance: weiToNumber(RewardTokenBalance?.balance),
    completed_missions: response.missions,
    completed_actions: response.actions,
  };
}
