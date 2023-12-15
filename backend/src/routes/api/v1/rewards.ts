import {
  ActivityType,
  Chains,
  OpenFormatSDK,
  RewardTriggerParams,
  RewardType,
  toWei,
} from "@openformat/sdk";
import { Hono } from "hono";

enum Status {
  SUCCESS = "Success",
  FAIL = "Failed",
}

const sdk = new OpenFormatSDK({
  network: Chains.polygonMumbai,
  starId: process.env.APP_ID as string,
  signer: process.env.PRIVATE_KEY,
});

const rewards = new Hono();

rewards.onError((err, c) => {
  console.error(`${err}`);
  return c.json({ status: "Failed", message: err.message }, 500);
});

rewards.post("/xp/award", async (c) => {
  const { receiver, action_id } = await c.req.json();

  const params: RewardTriggerParams = {
    receiver,
    tokens: [
      {
        id: action_id,
        address: process.env.XP_TOKEN_ID as string,
        amount: toWei("10"),
        activityType: ActivityType.ACTION,
        type: RewardType.XP_TOKEN,
      },
    ],
  };

  const reward = await sdk.Reward.trigger(params);

  return c.json({
    status: Status.SUCCESS,
    transaction: `https://mumbai.polygonscan.com/tx/${reward.transactionHash}`,
  });
});

// rewards.post("/rewards/reward_token/award", async (c) => {});
rewards.post("/badges/:id/award", async (c) => {
  const id = c.req.param("id");
  return c.text(id);
});

export default rewards;
