import { usePrivy } from "@privy-io/react-auth";
import Grid from "components/Grid";
import Keyboard, { isMappableKey } from "components/Keyboard";
import { ANIMAL_WORDS } from "constants/special_words";
import { useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import { useProfileStore } from "stores";
import { useGameStore } from "stores/game";
import { useStatsStore } from "stores/stats";
import handleRewards from "utils/handleRewards";

const { useSelector } = useGameStore;

export default function Home() {
  const { state: gameState, actions: gameActions } = useGameStore();
  const { state: stats, actions: statsActions } = useStatsStore();
  const { updateProfileData } = useProfileStore();

  const { user } = usePrivy();
  const address = user?.wallet?.address;
  const keys = useSelector("getUsedKeys");

  useEffect(() => {
    gameActions.init().then((state) => {
      if (state?.status && state?.status !== "new") {
        setTimeout(() => gameActions.openModal("paywall"), 2000);
      } else if (!localStorage.getItem("onboardingComplete")) {
        gameActions.openModal("introduction");
        localStorage.setItem("onboardingComplete", "true");
      }
    });
  }, [gameActions]);

  const handleKeyPress = useCallback(
    async (key: string) => {
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
              await handleRewards(
                address,
                "guess_an_animal",
                updateProfileData
              );
            }
          }

          switch (result.status) {
            case "win":
              statsActions.captureWin({
                attempts: result.attempts,
              });
              if (address) {
                await handleRewards(address, "win", updateProfileData);

                switch (result.attempts) {
                  case 1:
                    return await handleRewards(
                      address,
                      "first_guess",
                      updateProfileData
                    );
                  case 2:
                    return await handleRewards(
                      address,
                      "second_guess",
                      updateProfileData
                    );
                  case 3:
                    return await handleRewards(
                      address,
                      "third_guess",
                      updateProfileData
                    );
                  case 4:
                    return await handleRewards(
                      address,
                      "fourth_guess",
                      updateProfileData
                    );
                  case 5:
                    return await handleRewards(
                      address,
                      "fifth_guess",
                      updateProfileData
                    );
                  case 6:
                    return await handleRewards(
                      address,
                      "sixth_guess",
                      updateProfileData
                    );
                }
              } else {
                console.error(
                  "Cannot capture Win Stats. Address is undefined."
                );
              }
              break;
            case "loss":
              if (address) {
                await handleRewards(address, "lose", updateProfileData);
              }
              statsActions.captureLoss();
              break;
          }
          break;
      }
    },
    [gameActions, statsActions, gameState]
  );

  return (
    <>
      {Boolean(process.env.NEXT_PUBLIC_SHOW_SECRET === "true") && (
        <div className="border p-2 text-center font-mono uppercase tracking-widest">
          TEST_MODE: {gameState.secret}
        </div>
      )}
      {gameState.status !== "new" && (
        <div className="m-2 mx-auto max-w-max rounded-lg bg-rose-500 px-5 py-2 font-bold uppercase text-white">
          The word is {gameState.secret}
        </div>
      )}

      <Grid data={gameState.grid} />
      <Keyboard
        usedKeys={keys}
        disabled={gameState.isLoading || gameState.status !== "new"}
        onKeyPress={handleKeyPress}
      />
    </>
  );
}
