import { ConnectButton, useOpenFormat, useWallet } from "@openformat/react";
import { APP_NAME } from "constants/global";
import { useEffect } from "react";
import { useProfileStore } from "stores";
import { useGameStore } from "stores/game";
import apiClient from "utils/apiClient";
import handleRewards from "utils/handleRewards";
import { IconButton } from "./Button";
import { BarChartIcon, HelpIcon, PaywallIcon } from "./icons";
import Link from "./Link";

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
          await handleRewards(address, "login");
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
    <header className="grid w-full grid-rows-1 items-center space-y-2 bg-opacity-50 md:grid-cols-3">
      <nav className="space-x-2 px-2 text-center md:text-left">
        <Link href="/">Play</Link>
        <Link href="/leaderboard">Leaderboard</Link>
        <Link href="/profile">Profile</Link>
        <Link href="/quests">Quests</Link>
      </nav>
      <div className="row-start-1 justify-self-center md:row-auto">
        <Link href="/">
          <h1>{APP_NAME}</h1>
        </Link>
      </div>
      <div className="flex flex-col items-center space-x-2 space-y-2 md:flex-row md:space-y-0 md:justify-self-end">
        <div className="flex space-x-2">
          {profileData?.xp_balance && (
            <span className="whitespace-nowrap">
              <strong>{profileData?.xp_balance} XP</strong>
            </span>
          )}
          {profileData?.reward_token_balance && (
            <span className="whitespace-nowrap">
              <strong> {profileData?.reward_token_balance} $WORDLE </strong>
            </span>
          )}
        </div>
        <div className="fixed right-2 top-2 flex flex-col items-center space-y-2 md:relative md:right-0 md:top-0 md:flex-row  md:space-x-2 md:space-y-0">
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
        </div>
        <div className="items-center md:relative md:flex md:p-2">
          <ConnectButton
            switchToActiveChain={true}
            modalSize="compact"
            welcomeScreen={{
              title: "Welcome to OPENFORMAT",
              subtitle: "Connect with Metamask or Continue as Guest.",
            }}
            modalTitleIconUrl={"https://app.openformat.tech/favicon.ico"}
          />
        </div>
      </div>
    </header>
  );
}
