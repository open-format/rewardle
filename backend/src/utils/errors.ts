import { ethers } from "ethers";

function envErrorMessage(envName: string): string {
  return `${envName} invalid or not set in ./backend/.env`;
}

export function checkEnv() {
  let errors = [];

  if (!validAddressEnv(process.env.APPLICATION_ID as string)) {
    errors.push(envErrorMessage("APPLICATION_ID"));
  }
  if (!validAddressEnv(process.env.XP_TOKEN_ID as string)) {
    errors.push(envErrorMessage("XP_TOKEN_ID"));
  }
  if (!validAddressEnv(process.env.REWARD_TOKEN_ID as string)) {
    errors.push(envErrorMessage("REWARD_TOKEN_ID"));
  }
  if (!process.env.PRIVATE_KEY) {
    errors.push(envErrorMessage("PRIVATE_KEY"));
  }

  if (errors.length > 0) {
    throw new Error(errors.join("\n"));
  }
}

export function validAddressEnv(env: string): boolean {
  return ethers.utils.isAddress(env) && Boolean(env);
}
