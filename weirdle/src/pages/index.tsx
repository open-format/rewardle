import {
  ContractType,
  ERC20Base,
  toWei,
  useOpenFormat,
  useWallet,
} from "@openformat/react";
import Grid from "components/Grid";
import Header from "components/Header";
import HelpModal from "components/HelpModal";
import Keyboard, { isMappableKey } from "components/Keyboard";
import PaywallModal from "components/PaywallModal";
import SettingsModal from "components/SettingsModal";
import StatsModal from "components/StatsModal";
import { useCallback, useEffect } from "react";
import { useGameStore } from "stores/game";
import { useStatsStore } from "stores/stats";

const { useSelector } = useGameStore;

export default function Home() {
  const { state: gameState, actions: gameActions } = useGameStore();
  const { state: stats, actions: statsActions } = useStatsStore();

  const { sdk } = useOpenFormat();
  const { address } = useWallet();
  const keys = useSelector("getUsedKeys");

  useEffect(() => {
    gameActions.init().then(() => {
      console.log("weirdle: cached state restored");
    });
  }, [gameActions]);

  const handleKeyPress = useCallback(
    async (key: string) => {
      if (!isMappableKey(key)) {
        gameActions.insert(key);
        return;
      }

      switch (key) {
        case "backspace":
          gameActions.delete();
          break;
        case "enter":
          const result = await gameActions.guess();

          switch (result.status) {
            case "win":
              if (address) {
                statsActions.captureWin({
                  attempts: result.attempts,
                  address: address,
                });
              } else {
                console.error(
                  "Cannot capture Win Stats. Address is undefined."
                );
              }
              break;
            case "loss":
              statsActions.captureLoss();
              break;
          }
          break;
      }
    },
    [gameActions, statsActions]
  );

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
      <Header onIconClick={gameActions.openModal} />
      <main className="m-auto flex max-w-lg flex-1 flex-col justify-between p-4">
        {process.env.NODE_ENV === "development" && (
          <div className="border bg-gray-100 p-2 text-center font-mono uppercase tracking-widest">
            {gameState.secret}
          </div>
        )}
        <Grid data={gameState.grid} />
        <div className="flex-1 md:hidden"></div>
        <Keyboard
          usedKeys={keys}
          disabled={gameState.isLoading}
          onKeyPress={handleKeyPress}
        />
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
    </div>
  );
}
