import { RewardType } from "@openformat/react";

interface Action {
  xp_rewarded: string;
  user: { id: string };
  createdAt: string;
}

interface Mission {
  xp_rewarded: string;
  user: { id: string };
  createdAt: string;
}

interface LeaderboardEntry {
  user: string;
  xp_rewarded: string;
}

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
  badgeUrl: string;
};

type MissionConfigToken = {
  address: string;
  amount: number;
  uri?: string;
};

type MissionConfigRequirements = {
  actionId: string;
  description: string;
  count: number;
};

type User = {
  eth_address?: string;
  email: string;
  nickname?: string;
  id: string;
  name: string;
  address: string;
  xp_balance: number;
  reward_token_balance: string[];
  completed_actions: Action[];
  completed_missions: Mission[];
};

type Token = {
  id: string;
  amount: string | number;
  address: string;
  type: RewardType;
  activityType: string;
  tokenURI?: string;
};
