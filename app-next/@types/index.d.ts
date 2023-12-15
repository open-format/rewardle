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
