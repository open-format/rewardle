import { RewardType } from "@openformat/react";
import { BigNumber } from "ethers";

type Action = {
  id: string;
  user: User;
  amount: number;
  description: string;
  metadata?: {
    name: string;
  };
  address: string;
  xp?: number;
  action_id?: string;
};

type ActionConfig = {
  id: string;
  amount: number;
  description: string;
  address: string;
};

type MissionConfig = {
  id: string;
  description: string;
  tokens: MissionConfigToken[];
  requirements: MissionConfigRequirements[];
};

type MissionConfigToken = {
  address: string;
  amount: number;
  uri?: string;
};

type MissionConfigRequirements = {
  actionId: string;
  count: number;
};

type Mission = {
  id: string;
  description: string;
  requirements: MissionRequirement[];
  amount?: number;
  tokens?: Token[];
  badge?: string;
  badge_URI?: string;
  user?: User;
  metadata?: {
    name: string;
  };
  mission_id?: string;
};

type User = {
  eth_address?: string;
  discord_user_id?: number;
  nickname?: string;
  id: string;
  name: string;
  address: string;
  xp: number;
  rewarded: Token[];
  completedActions: string[];
  completedMissions: string[];
};

type MissionRequirement = {
  actionId: string;
  count: number;
};

type Token = {
  id: string;
  amount: BigNumber | number;
  address: string;
  type: RewardType;
  activityType: string;
  tokenURI?: string;
};
