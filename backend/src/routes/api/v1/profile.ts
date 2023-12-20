import { Chains, OpenFormatSDK } from "@openformat/sdk";
import { Hono } from "hono";
import { GetUserProfileResponse } from "../../../../@types";
import { getUserProfile } from "../../../queries";
import { weiToNumber } from "../../../utils/formatting";

enum Status {
  SUCCESS = "success",
  FAIL = "failed",
}

const sdk = new OpenFormatSDK({
  network: Chains.polygonMumbai,
  starId: process.env.APPLICATION_ID as string,
  signer: process.env.PRIVATE_KEY,
});

const profile = new Hono();

profile.onError((err, c) => {
  console.error(`${err}`);
  return c.json({ status: "Failed", message: err.message }, 500);
});

profile.get("/me", async (c) => {
  const USER = "0x03755352654D73DA06756077Dd7f040ADcE3Fd58";
  const NAME = "John";
  const EMAIL = "John@example.com";

  const response =
    await sdk.subgraph.rawRequest<GetUserProfileResponse>(
      getUserProfile,
      {
        user: USER.toLowerCase(),
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

  return c.json({
    status: Status.SUCCESS,
    name: NAME,
    email: EMAIL,
    eth_address: USER,

    xp_balance: weiToNumber(XPBalance?.balance),
    reward_token_balance: weiToNumber(RewardTokenBalance?.balance),
    completed_missions: response.missions,
    completed_actions: response.actions,
  });
});

export default profile;
