import { useIsWalletModalOpen, useWallet } from "@openformat/react";
import Grid from "components/Grid";
import Keyboard, { isMappableKey } from "components/Keyboard";
import { ANIMAL_WORDS } from "constants/special_words";
import { useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import { useGameStore } from "stores/game";
import { useStatsStore } from "stores/stats";
import handleRewards from "utils/handleRewards";

const { useSelector } = useGameStore;

export default function Home() {
  const walletModalState = useIsWalletModalOpen();
  const { state: gameState, actions: gameActions } = useGameStore();
  const { state: stats, actions: statsActions } = useStatsStore();

  const { address } = useWallet();
  const keys = useSelector("getUsedKeys");

  useEffect(() => {
    gameActions.init().then(() => {
      console.log("weirdle: cached state restored");
    });
  }, [gameActions]);

  const handleKeyPress = useCallback(
    async (key: string) => {
      if (walletModalState) {
        return;
      }
      if (gameState.status !== "new") {
        return;
      }
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
          const isAnimalWord = ANIMAL_WORDS.includes(result.guess);

          if (address) {
            if (isAnimalWord && result?.guess) {
              toast.success(
                `You received an Animal Word Reward for ${result.guess}.`
              );
              await handleRewards(address, "animal");
            }
          }

          switch (result.status) {
            case "win":
              statsActions.captureWin({
                attempts: result.attempts,
              });
              if (address) {
                if (result.attempts === 1) {
                  await handleRewards(address, "one_guess");
                }
                if (result.attempts === 6) {
                  await handleRewards(address, "last_chance");
                }
                if (stats.currentStreak === 10) {
                  await handleRewards(address, "streak_10");
                }
                if (stats.currentStreak === 20) {
                  await handleRewards(address, "streak_20");
                }
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
    [gameActions, statsActions, gameState, walletModalState]
  );

  return (
    <>
      {process.env.NEXT_PUBLIC_SHOW_SECRET && (
        <div className="border bg-gray-100 p-2 text-center font-mono uppercase tracking-widest">
          TEST_MODE: {gameState.secret}
        </div>
      )}
      {gameState.status === "lost" && (
        <div className="m-2 mx-auto max-w-max rounded-lg bg-rose-500 px-5 py-2 font-bold uppercase text-white">
          The word is {gameState.secret}
        </div>
      )}

      <Grid data={gameState.grid} />
      <div className="flex-1 md:hidden"></div>
      <Keyboard
        usedKeys={keys}
        disabled={gameState.isLoading || gameState.status !== "new"}
        onKeyPress={handleKeyPress}
      />
    </>
  );
}
