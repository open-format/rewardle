import {
  ContractType,
  ERC20Base,
  toWei,
  useOpenFormat,
  useWallet,
} from "@openformat/react";
import Header from "components/Header";
import HelpModal from "components/HelpModal";
import SettingsModal from "components/SettingsModal";
import StatsModal from "components/StatsModal";
import React, { useState } from "react";
import { useProfileStore } from "stores";
import { useGameStore } from "stores/game";
import GameContext from "utils/GameContext";
import PaywallModal from "./PaywallModal";

const Layout: React.FC<{ onIconClick?: () => void }> = ({ children }) => {
  const { state: gameState, actions: gameActions } = useGameStore();
  const [isLoading, setIsLoading] = useState<boolean>();

  const { sdk } = useOpenFormat();
  const { address } = useWallet();
  const { updateProfileData } = useProfileStore();

  async function spendTokens() {
    try {
      if (address) {
        setIsLoading(true);
        const rewardToken = (await sdk.getContract({
          contractAddress: process.env.NEXT_PUBLIC_REWARD_TOKEN_ID!,
          type: ContractType.Token,
        })) as ERC20Base;

        await rewardToken
          .transfer({
            to: process.env.NEXT_PUBLIC_APPLICATION_OWNER_ADDRESS!,
            amount: toWei("1"),
          })
          .then(() => {
            updateProfileData();
            gameActions.closeModal(), gameActions.bypass();
          });
      }
    } catch (e: any) {
      console.log(e.message);
    }
    setIsLoading(false);
  }

  return (
    <div className="m-auto flex h-screen w-full flex-col dark:bg-gray-700">
      <GameContext.Provider value={{ handlePayment: spendTokens }}>
        <Header />
        <main className="m-auto flex flex-1 flex-col justify-between p-4">
          {children}
        </main>
        <HelpModal
          open={gameState.activeModal === "help"}
          onClose={gameActions.closeModal}
        />
        <StatsModal
          open={gameState.activeModal === "stats"}
          onClose={gameActions.closeModal}
        />
        <SettingsModal
          open={gameState.activeModal === "settings"}
          onClose={gameActions.closeModal}
        />
        <PaywallModal
          open={gameState.activeModal === "paywall"}
          onClose={gameActions.closeModal}
          handlePayment={spendTokens}
          isLoading={isLoading}
        />
      </GameContext.Provider>
    </div>
  );
};

export default Layout;
