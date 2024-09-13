import type { PrivyClientConfig } from "@privy-io/react-auth";
import { arbitrumSepolia } from "viem/chains";

// Replace this with your Privy config
export const privyConfig: PrivyClientConfig = {
  embeddedWallets: {
    createOnLogin: "users-without-wallets",
  },
  appearance: {
    theme: "dark",
    landingHeader: "Welcome to Rewardle!",
    loginMessage:
      "A blockchain based word game where you earn points, badges and credits for guessing words.",
  },
  defaultChain: arbitrumSepolia,
  loginMethods: ["wallet", "email"],
};
