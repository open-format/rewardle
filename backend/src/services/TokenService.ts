import { OpenFormatSDK, RewardTriggerParams } from "@openformat/sdk";
import { Action, Mission } from "../../@types";
import {
  getActionsByUserAndRequirements,
  getMissionsByUserAndRequirements,
} from "../queries";

export default class TokenService {
  sdk: OpenFormatSDK;
  constructor(sdk: OpenFormatSDK) {
    this.sdk = sdk;
  }

  async getUserCompletedActions(address: string): Promise<string[]> {
    const response = await this.sdk.subgraph.rawRequest(
      getActionsByUserAndRequirements,
      {
        user: address.toLowerCase(),
        app: this.sdk.appId.toLowerCase(),
      }
    );

    const actionIds = response.actions.map(
      (action: Action) => action?.metadata?.name
    );
    return actionIds;
  }

  async getUserCompletedMissions(address: string): Promise<string[]> {
    const response = await this.sdk.subgraph.rawRequest(
      getMissionsByUserAndRequirements,
      {
        user: address.toLowerCase(),
        app: this.sdk.appId.toLowerCase(),
      }
    );

    const missionIds = response.missions.map(
      (mission: Mission) => mission?.metadata?.name
    );
    return missionIds;
  }

  async trigger(data: RewardTriggerParams) {
    try {
      const tx = await this.sdk.Reward.trigger(data);

      return {
        success: true,
        message: "Reward triggered successfully",
        params: data,
        transactionHash: tx.transactionHash,
      };
    } catch (err) {
      throw new Error(String(err));
    }
  }
}
