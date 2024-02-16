interface Action {
  xp_rewarded: string;
  user: { id: string };
  createdAt: string;
  metadata: { name: string };
}

interface Mission {
  xp_rewarded: string;
  user: { id: string };
  createdAt: string;
  metadata: { name: string };
}

interface LeaderboardEntry {
  user: string;
  user_address: string;
  xp_rewarded: string;
}

export interface ProfileData {
  nickname: string;
  eth_address: string;
  email_address: string;
  xp_balance: string;
  reward_token_balance: string;
  completed_missions: Mission[];
  completed_actions: Action[];
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
  completed: boolean;
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
