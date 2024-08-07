import { usePrivy } from "@privy-io/react-auth";
import { GAME_COST, TOKEN_NAME } from "constants/global";
import Link from "next/link";
import { useProfileStore } from "stores";
import { useGameStore } from "stores/game";
import { Button } from "./Button";
import Modal, { Props as ModalProps } from "./Modal";

export type Props = Pick<ModalProps, "open" | "onClose">;

export default function PaywallModal(props: Props) {
  const { user, login } = usePrivy();
  const address = user?.wallet?.address;
  const { profileData, updateProfileData } = useProfileStore();
  const { state: gameState } = useGameStore();

  const title =
    gameState.status === "won"
      ? `You Won`
      : gameState.status === "lost"
      ? `You Lost!`
      : "Play Again?";

  const lowBalance = Number(profileData?.reward_token_balance) < GAME_COST;

  return (
    <Modal title={title} open={props.open} onClose={props.onClose}>
      <div className="space-y-2">
        <p>You have the option to wait and play again tomorrow.</p>
        {lowBalance ? (
          <p>
            To play again now, you will need {GAME_COST} ${TOKEN_NAME}. Explore
            the{" "}
            <Link onClick={props.onClose} className="underline" href="/quests">
              Quests
            </Link>{" "}
            page to discover additional ways of earning ${TOKEN_NAME}.
          </p>
        ) : (
          <p>
            As you have {GAME_COST} ${TOKEN_NAME} credits, you can play again
            now.
          </p>
        )}
        <div className="flex justify-center">
          {!address && !lowBalance ? (
            <Button onClick={login}>Login to play again</Button>
          ) : (
            address &&
            !lowBalance && (
              <Button
                onClick={props.handlePayment}
                isLoading={props.isLoading}
                disabled={
                  !address ||
                  Number(profileData?.reward_token_balance) < GAME_COST ||
                  props.isLoading
                }
              >
                Use {GAME_COST} ${TOKEN_NAME} to play
              </Button>
            )
          )}
        </div>
      </div>
    </Modal>
  );
}
