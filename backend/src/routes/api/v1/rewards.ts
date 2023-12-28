import { Chains, OpenFormatSDK } from "@openformat/sdk";
import { Hono } from "hono";
import TokenSystem from "../../../utils/tokenSystem";

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

/**
 * Triggers the token system reward process based on a user's completed action.
 *
 * This endpoint processes a user's action and calculates the appropriate reward
 * using the token system. It checks for completed missions and triggers rewards accordingly.
 * See `action.json` and `mission.json` for action and mission configuration.
 *
 * @route POST rewards/token-system/trigger
 *
 * @param {string} c.req.json().user_address - The blockchain address of the user.
 * @param {string} c.req.json().action_id - The unique identifier of the completed action.
 * @returns {Promise<Object>} The JSON response containing the status, transaction URL, and rewards.
 *
 * @example
 * curl --location 'http://localhost:8080/api/v1/rewards/token-system/trigger' \
 * --header 'Content-Type: application/json' \
 * --data '{
 *    "user_address": "0x03755352654D73DA06756077Dd7f040ADcE3Fd58",
 *    "action_id": "test_action"
 * }'
 */
rewards.post("/token-system/trigger", async (c) => {
  const { user_address, action_id } = await c.req.json();

  const tokenSystem = new TokenSystem(sdk);

  const reward = await tokenSystem.handleCompletedAction(
    user_address,
    action_id
  );

  return c.json({
    status: Status.SUCCESS,
    transaction: `https://mumbai.polygonscan.com/tx/${reward.transactionHash}`,
    rewards: reward.rewarded,
  });
});

export default rewards;
