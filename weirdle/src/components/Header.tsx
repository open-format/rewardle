import { ConnectButton, useOpenFormat, useWallet } from "@openformat/react";
import Link from "next/link";
import { useEffect } from "react";
import { useProfileStore } from "stores";
import { useGameStore } from "stores/game";
import { APP_NAME } from "stores/game/constants";
import apiClient from "utils/apiClient";
import { IconButton } from "./Button";
import { BarChartIcon, HelpIcon, PaywallIcon } from "./icons";

export default function Header() {
  const { address } = useWallet();
  const { sdk } = useOpenFormat();

  const { profileData, resetProfileData, updateProfileData } =
    useProfileStore();
  const { state: gameState, actions: gameActions } = useGameStore();

  const handleAuth = async () => {
    if (!address) return;
    try {
      const challengeResponse = await apiClient.post("auth/challenge", {
        eth_address: address,
      });
      const signedMessage = await sdk.signer?.signMessage(
        challengeResponse.data.challenge
      );

      await apiClient
        .post("auth/verify", {
          eth_address: address,
          signature: signedMessage,
        })
        .then(async ({ data }) => {
          data.address = address;
          localStorage.setItem("tokens", JSON.stringify(data));
          updateProfileData();
        });
    } catch (error) {
      console.error("Authentication error:", error);
    }
  };

  useEffect(() => {
    const tokens = localStorage.getItem("tokens");
    const parsedTokens = tokens ? JSON.parse(tokens) : null;

    if ((address && !tokens) || address !== parsedTokens?.address) {
      handleAuth();
    }

    if (address && address === parsedTokens?.address) {
      updateProfileData();
    }

    if (!address) {
      resetProfileData();
    }
  }, [address]);

  return (
    <header className="w-full border-b-2 bg-brand p-4 dark:border-gray-800">
      <div className="m-auto flex items-center justify-between">
        <div className="space-x-5">
          <Link href="/">Play</Link>
          <Link href="/leaderboard">Leaderboard</Link>
          {address && <Link href="/profile">Profile</Link>}
          <Link href="/quests">Quests</Link>
        </div>

        <div className="text-center text-4xl font-bold tracking-widest text-white">
          <Link href="/">{APP_NAME}</Link>
        </div>
        <div className="flex items-center gap-2">
          {profileData?.reward_token_balance && (
            <div>Balance: {profileData?.reward_token_balance} $WORDLE</div>
          )}
          {gameState.status !== "new" && (
            <IconButton onClick={() => gameActions.openModal("paywall")}>
              <PaywallIcon />
            </IconButton>
          )}
          <IconButton onClick={() => gameActions.openModal("help")}>
            <HelpIcon />
          </IconButton>
          <IconButton onClick={() => gameActions.openModal("stats")}>
            <BarChartIcon />
          </IconButton>
          <ConnectButton modalSize="compact" />
        </div>
      </div>
    </header>
  );
}
