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
  SUCCESS = "success",
  FAIL = "failed",
}

const sdk = new OpenFormatSDK({
  network: Chains.polygonMumbai,
  starId: process.env.APPLICATION_ID as string,
  signer: process.env.PRIVATE_KEY,
});

const rewards = new Hono();

rewards.onError((err, c) => {
  console.error(`${err}`);
  return c.json({ status: "Failed", message: err.message }, 500);
});

rewards.post("/actions/xp/award", async (c) => c.text(""));
rewards.post("/actions/reward-token/award", async (c) => c.text(""));
rewards.post("/actions/badges/:id/award", async (c) => c.text(""));
rewards.post("/missions/xp/award", async (c) => c.text(""));
rewards.post("/missions/reward-token/award", async (c) => c.text(""));
rewards.post("/missions/badges/:id/award", async (c) => c.text(""));
rewards.post("/batch-award", async (c) => c.text(""));

/**
 * POST rewards/xp/award
 *
 * @summary Awards XP tokens to a user based on an action.
 * @tags rewards
 * @param {string} request.body.receiver - A Valid ethereum address of the receiver of the XP Tokens
 * @param {string} request.body.action_id - ID of the action triggering the reward
 * @return {object} 200 - Success response - application/json
 */

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

/**
 * POST /rewards/reward-token/award
 *
 * @summary Awards a reward token to a user for completing a mission.
 * @tags rewards
 * @param {object} request.body.required - The receiver and action ID
 * @param {string} request.body.receiver - A Valid ethereum address of the receiver of the Reward Tokens
 * @param {string} request.body.action_id - ID of the action triggering the reward
 * @return {object} 200 - Success response - application/json
 */

rewards.post("/reward-token/award", async (c) => {
  const { receiver, action_id } = await c.req.json();

  const params: RewardTriggerParams = {
    receiver,
    tokens: [
      {
        id: action_id,
        address: process.env.REWARD_TOKEN_ID as string,
        amount: 1,
        activityType: ActivityType.MISSION,
        type: RewardType.CONSTELLATION_TOKEN,
      },
    ],
  };

  const reward = await sdk.Reward.trigger(params);

  return c.json({
    status: Status.SUCCESS,
    transaction: `https://mumbai.polygonscan.com/tx/${reward.transactionHash}`,
  });
});

/**
 * POST /badges/:id/award
 *
 * @summary Awards a specific badge to a user for completing a mission.
 * @tags rewards
 * @param {string} id.path.required - ID of the badge
 * @param {string} request.body.receiver - A Valid ethereum address of the receiver of the Badge
 * @param {string} request.body.action_id - ID of the action triggering the award
 * @return {object} 200 - Success response - application/json
 */

rewards.post("/badges/:id/award", async (c) => {
  const badgeAddress = c.req.param("id");
  const { receiver, action_id } = await c.req.json();

  const params: RewardTriggerParams = {
    receiver,
    tokens: [
      {
        id: action_id,
        address: badgeAddress,
        amount: 1,
        activityType: ActivityType.MISSION,
        type: RewardType.BADGE,
      },
    ],
  };

  const reward = await sdk.Reward.trigger(params);

  return c.json({
    status: Status.SUCCESS,
    transaction: `https://mumbai.polygonscan.com/tx/${reward.transactionHash}`,
  });
});

export default rewards;
