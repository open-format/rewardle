export function isXP(token: string) {
  return Boolean(token === process.env.NEXT_PUBLIC_XP_TOKEN_ID);
}

export function isRewardToken(token: string) {
  return Boolean(token === process.env.NEXT_PUBLIC_REWARD_TOKEN_ID);
}
