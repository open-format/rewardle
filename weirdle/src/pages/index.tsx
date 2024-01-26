import {
  ContractType,
  ERC20Base,
  toWei,
  useOpenFormat,
  useWallet,
} from "@openformat/react";
import Grid from "components/Grid";
import Keyboard, { isMappableKey } from "components/Keyboard";
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

  return (
    <>
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
    </>
  );
}
