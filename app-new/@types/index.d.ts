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

export interface ProfileData {
  name: string;
  eth_address: string;
  email: string;
  xp_balance: string;
  reward_token_balance: string;
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
