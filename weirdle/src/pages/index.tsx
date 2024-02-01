import { useWallet } from "@openformat/react";
import Grid from "components/Grid";
import Keyboard, { isMappableKey } from "components/Keyboard";
import { useCallback, useEffect } from "react";
import { useGameStore } from "stores/game";
import { useStatsStore } from "stores/stats";
import handleRewards from "utils/handleRewards";

const { useSelector } = useGameStore;

export default function Home() {
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
              statsActions.captureWin({
                attempts: result.attempts,
              });
              if (address) {
                if (result.attempts === 1) {
                  await handleRewards(address, "one_guess");
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
    [gameActions, statsActions]
  );

  return (
    <>
      {process.env.NODE_ENV === "development" && (
        <div className="border bg-gray-100 p-2 text-center font-mono uppercase tracking-widest">
          {gameState.secret}
        </div>
      )}
      {gameState.status === "won" ||
        (gameState.guesses.length >= 6 && (
          <div className="border bg-gray-100 p-2 text-center font-mono uppercase tracking-widest">
            <h3>
              You have completed today's game.{" "}
              <button onClick={() => gameActions.reset()}>Pay to play</button>{" "}
              again?
            </h3>
          </div>
        ))}

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
