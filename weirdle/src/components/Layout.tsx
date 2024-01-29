import React from "react";
import Header from "components/Header";
import SettingsModal from "components/SettingsModal";
import StatsModal from "components/StatsModal";
import HelpModal from "components/HelpModal";
import { useGameStore } from "stores/game";
import PaywallModal from "./PaywallModal";
import GameContext from "utils/GameContext";
import {
  ContractType,
  ERC20Base,
  toWei,
  useOpenFormat,
  useWallet,
} from "@openformat/react";

const Layout: React.FC<{ onIconClick?: () => void }> = ({
  children,
  onIconClick,
}) => {
  const { state: gameState, actions: gameActions } = useGameStore();

  const { sdk } = useOpenFormat();
  const { address } = useWallet();

  async function spendTokens() {
    try {
      if (address) {
        const rewardToken = (await sdk.getContract({
          contractAddress: process.env.NEXT_PUBLIC_REWARD_TOKEN_ID as string,
          type: ContractType.Token,
        })) as ERC20Base;

        await rewardToken
          .transfer({
            to: process.env.NEXT_PUBLIC_APPLICATION_OWNER_ADDRESS as string,
            amount: toWei("1"),
          })
          .then(() => {
            gameActions.closeModal(), gameActions.reset();
          });
      }
    } catch (e: any) {
      console.log(e.message);
      alert(e.message);
    }
  }

  return (
    <div className="m-auto flex h-screen w-full flex-col dark:bg-gray-700">
      <GameContext.Provider value={{ handlePayment: spendTokens }}>
        <Header onIconClick={onIconClick} />
        <main className="m-auto flex max-w-lg flex-1 flex-col justify-between p-4">
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
        />
      </GameContext.Provider>
    </div>
  );
};

export default Layout;
