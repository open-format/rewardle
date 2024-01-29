import {
  ConnectButton,
  ContractType,
  ERC20Base,
  toWei,
  useOpenFormat,
  useWallet,
} from "@openformat/react";
import { useGameStore } from "stores/game";
import { APP_NAME, ModalKind } from "stores/game/constants";
import { IconButton } from "./Button";
import { BarChartIcon, HelpIcon } from "./icons";
import Link from "next/link";
import { useEffect } from "react";
import apiClient from "utils/apiClient";
import { useRouter } from "next/router";

type Props = {
  onIconClick(modalKind: ModalKind): void;
};

export default function Header(props: Props) {
  const { address } = useWallet();
  const { sdk } = useOpenFormat();
  const router = useRouter();
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

      const verifyResponse = await apiClient.post("auth/verify", {
        eth_address: address,
        signature: signedMessage,
      });
      verifyResponse.data.address = address;
      localStorage.setItem("tokens", JSON.stringify(verifyResponse.data));
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
  }, [address]);

  return (
    <header className="w-full border-b-2 bg-brand p-4 dark:border-gray-800">
      <div className="m-auto flex max-w-lg justify-between">
        <div className="flex gap-2">
          <IconButton onClick={() => gameActions.openModal("help")}>
            <HelpIcon />
          </IconButton>
        </div>

        <div className="text-center text-4xl font-bold tracking-widest text-white">
          <Link href="/">{APP_NAME}</Link>
        </div>

        <div className="flex gap-2">
          <IconButton onClick={() => gameActions.openModal("stats")}>
            <BarChartIcon />
          </IconButton>
        </div>
        <Link href="/leaderboard">Leaderboard</Link>
        <Link href="/profile">Profile</Link>
        <Link href="/quests">Quests</Link>
        <ConnectButton />
      </div>
    </header>
  );
}
