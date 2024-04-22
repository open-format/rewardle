import { Chains, OpenFormatSDK } from "@openformat/sdk";

export const sdk = new OpenFormatSDK({
  network: Chains.arbitrumSepolia,
  appId: process.env.APPLICATION_ID as string,
  signer: process.env.PRIVATE_KEY,
});
