import { useSetIsWalletModalOpen, useWallet } from "@openformat/react";
import { GAME_COST } from "constants/global";
import Link from "next/link";
import { useProfileStore } from "stores";
import { useGameStore } from "stores/game";
import { Button } from "./Button";
import Modal, { Props as ModalProps } from "./Modal";

export type Props = Pick<ModalProps, "open" | "onClose">;

export default function PaywallModal(props: Props) {
  const { address } = useWallet();
  const { profileData } = useProfileStore();
  const { state: gameState } = useGameStore();
  const openModal = useSetIsWalletModalOpen();

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
            To play again now, you will need {GAME_COST} $WORDLE. Explore the{" "}
            <Link onClick={props.onClose} className="underline" href="/quests">
              Quests
            </Link>{" "}
            page to discover additional ways of earning $WORDLE.
          </p>
        ) : (
          <p>
            As you have {GAME_COST} $WORDLE credits, you can play again now.
          </p>
        )}
        <div className="flex justify-center">
          {!address && !lowBalance ? (
            <Button onClick={openModal}>Login to play again</Button>
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
                Use {GAME_COST} $WORDLE to play
              </Button>
            )
          )}
        </div>
      </div>
    </Modal>
  );
}
