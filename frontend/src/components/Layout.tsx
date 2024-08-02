import {
  ContractType,
  ERC20Base,
  toWei,
  useOpenFormat,
} from "@openformat/react";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import Header from "components/Header";
import HelpModal from "components/HelpModal";
import SettingsModal from "components/SettingsModal";
import StatsModal from "components/StatsModal";
import { GAME_COST } from "constants/global";
import React, { useState } from "react";
import { useProfileStore } from "stores";
import { useGameStore } from "stores/game";
import Footer from "./Footer";
import IntroductionModal from "./IntroductionModal";
import PaywallModal from "./PaywallModal";

const Layout: React.FC<{ onIconClick?: () => void }> = ({ children }) => {
  const { state: gameState, actions: gameActions } = useGameStore();
  const [isLoading, setIsLoading] = useState<boolean>();

  const { sdk } = useOpenFormat();
  const { user } = usePrivy();
  const { wallets } = useWallets();

  const address = user?.wallet?.address;
  const { updateProfileData } = useProfileStore();

  async function spendTokens() {
    try {
      if (address) {
        setIsLoading(true);
        const wallet = wallets[0];
        await wallet.switchChain(421614);

        const provider = await wallet.getEthersProvider();
        const signer = provider.getSigner();

        sdk.signer = signer;

        const rewardToken = (await sdk.getContract({
          contractAddress: process.env.NEXT_PUBLIC_REWARD_TOKEN_ID!,
          type: ContractType.Token,
        })) as ERC20Base;

        await rewardToken
          .transfer({
            to: process.env.NEXT_PUBLIC_APPLICATION_OWNER_ADDRESS!,
            amount: toWei(GAME_COST.toString()),
          })
          .then(() => {
            setTimeout(() => updateProfileData(), 500);
            gameActions.closeModal(), gameActions.bypass();
          });
      }
    } catch (e: any) {
      console.log(e.message);
    }
    setIsLoading(false);
  }

  return (
    <div className="flex w-screen flex-col items-center justify-center md:min-h-screen">
      <Header />
      <main className="item-center flex w-full max-w-5xl flex-1 flex-col p-4">
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
      <IntroductionModal
        open={gameState.activeModal === "introduction"}
        onClose={gameActions.closeModal}
      />
      <Footer />
    </div>
  );
};

export default Layout;
