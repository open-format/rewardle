import {
  ActivityType,
  OpenFormatSDK,
  RewardTriggerParams,
  RewardType,
  toWei,
} from "@openformat/sdk";
import TokenService from "../services/TokenService";

import {
  ActionConfig,
  MissionConfig,
  MissionRequirement,
  User,
} from "../../@types";
import actions from "../constants/actions.json";
import missions from "../constants/missions.json";

export default class TokenSystem {
  private tokenService: TokenService;
  private actions: ActionConfig[];
  private missions: MissionConfig[];

  constructor(sdk: OpenFormatSDK) {
    this.tokenService = new TokenService(sdk);
    this.actions = actions;
    //@TO-DO need to fix this type error
    //@ts-ignore
    this.missions = missions;
  }

  /**
   * Retrieves a user object with relevant information based on the given address.
   * @async
   * @function
   * @param {string} address - The user's unique blockchain address.
   * @returns {Promise<User>} A promise that resolves to an object containing the user's address, XP, completed actions, and completed missions.
   * @throws {Error} If there is an issue fetching the user's information.
   * @example
   * // Get the user's information
   * const user = await getUser('0x1234abcd...');
   */
  async getUser(address: string): Promise<User> {
    const completedActions =
      await this.tokenService.getUserCompletedActions(address);

    const xp = this.calculateUserXP(completedActions);
    const completedMissions =
      this.calculateCompletedMissions(completedActions);

    return {
      id: "",
      name: "",
      address,
      xp,
      completedActions,
      completedMissions,
      rewarded: [],
    };
  }

  async handleCompletedAction(
    address: string,
    actionId: string
  ): Promise<User> {
    // Get completed actions from the subgraph
    const completedActions =
      await this.tokenService.getUserCompletedActions(address);

    const previousMissions =
      await this.tokenService.getUserCompletedMissions(address);

    completedActions.push(actionId);

    const xp = this.calculateUserXP(completedActions);

    const completedMissions =
      this.calculateCompletedMissions(completedActions);

    const action = this.getActionById(actionId);

    // Trigger reward for the completed action
    const data: RewardTriggerParams = {
      receiver: address,
      tokens: [],
    };

    data.tokens.push({
      id: action.id,
      address: action.address,
      amount: toWei(action.amount.toString()),
      type: RewardType.XP_TOKEN,
      activityType: ActivityType.ACTION,
    });

    // Check for any newly completed missions
    const previousMissionsSet = new Set(previousMissions);
    for (const missionId of completedMissions) {
      if (!previousMissionsSet.has(missionId)) {
        // Trigger reward for the completed mission
        const mission = this.getMissionById(missionId);

        mission.tokens?.map((token) => {
          //if URI = It's a badge
          if (token.uri) {
            return data.tokens.push({
              id: mission.id,
              address: token.address,
              amount: token.amount,
              type: RewardType.BADGE,
              activityType: ActivityType.MISSION,
              tokenURI: token.uri,
            });
          } else if (this.isXP(token.address)) {
            return data.tokens.push({
              id: action.id,
              address: action.address,
              amount: toWei(action.amount.toString()),
              type: RewardType.XP_TOKEN,
              activityType: ActivityType.MISSION,
            });
          } else {
            return data.tokens.push({
              id: mission.id,
              address: token.address,
              amount: toWei(token.amount.toString()),
              type: RewardType.CONSTELLATION_TOKEN,
              activityType: ActivityType.MISSION,
            });
          }
        });

        // Add the mission to the previous missions to prevent duplicate rewards
        previousMissionsSet.add(missionId);
      }
    }

    const tx = await this.tokenService.trigger(data);

    return {
      id: "",
      name: "",
      address,
      xp,
      //@ts-ignore
      rewarded: data.tokens,
      transactionHash: tx.transactionHash,
      completedActions,
      completedMissions: Array.from(previousMissionsSet),
    };
  }

  private calculateUserXP(completedActions: string[]): number {
    let xp = 0;

    for (const actionId of completedActions) {
      const action = this.actions.find((a) => a.id === actionId);
      if (action) {
        xp += action.amount ?? 0;
      }
    }

    return xp;
  }

  private calculateCompletedMissions(
    completedActions: string[]
  ): string[] {
    const completedMissions: string[] = [];

    for (const mission of this.missions) {
      const actionCounts = this.getActionCounts(completedActions);

      if (
        this.isMissionCompleted(actionCounts, mission.requirements)
      ) {
        completedMissions.push(mission.id);
      }
    }

    return completedMissions;
  }

  private getActionCounts(
    completedActions: string[]
  ): Map<string, number> {
    const actionCounts = new Map<string, number>();

    for (const actionId of completedActions) {
      actionCounts.set(
        actionId,
        (actionCounts.get(actionId) || 0) + 1
      );
    }

    return actionCounts;
  }

  private isMissionCompleted(
    actionCounts: Map<string, number>,
    requirements: MissionRequirement[]
  ): boolean {
    for (const requirement of requirements) {
      if (
        (actionCounts.get(requirement.actionId) || 0) <
        requirement.count
      ) {
        return false;
      }
    }

    return true;
  }

  getActionById(id: string): ActionConfig {
    const action = this.actions.find((action) => action.id === id);
    if (!action) {
      throw new Error(`Action with ID ${id} not found.`);
    }
    return action;
  }

  getMissionById(id: string): MissionConfig {
    const mission = this.missions.find((action) => action.id === id);
    if (!mission) {
      throw new Error(`Action with ID ${id} not found.`);
    }
    return mission;
  }

  isXP(address: string): Boolean {
    const action = this.actions.find(
      (action) => action.address === address
    );
    if (action) {
      return true;
    } else {
      return false;
    }
  }
}
