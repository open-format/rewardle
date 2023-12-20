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
  actions: ActivityAction[];
  missions: ActivityMission[];
  accessKeys: AccessKey[];
  xpAwarded: number;
  rewardTokensAwarded: number;
  hasAccessKey: boolean;
  receivedAccessKeys: boolean;
  totalCompletedMissions: number;
  discord_user_id: string;
  discord_user_name: string;
  nickname: string;
  eth_address: string;
  email_address: string;
}
