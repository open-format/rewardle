import { useSetIsWalletModalOpen, useWallet } from "@openformat/react";
import { GAME_COST } from "constants/global";
import { useProfileStore } from "stores";
import { Button } from "./Button";
import Modal, { Props as ModalProps } from "./Modal";

export type Props = Pick<ModalProps, "open" | "onClose">;

export default function PaywallModal(props: Props) {
  const { address } = useWallet();
  const { profileData } = useProfileStore();
  const openModal = useSetIsWalletModalOpen();

  return (
    <Modal title="Pay to Play" open={props.open} onClose={props.onClose}>
      <div className="space-y-2">
        <p>
          You have the option to wait and play again tomorrow, or you can spend{" "}
          {GAME_COST} $WORDLE to play immediately.
        </p>
        <p>
          Explore the Quests page to discover additional ways of earning
          $WORDLE.
        </p>
        {address ? (
          <Button
            onClick={props.handlePayment}
            isLoading={props.isLoading}
            disabled={
              !address ||
              Number(profileData?.reward_token_balance) < GAME_COST ||
              props.isLoading
            }
          >
            {Number(profileData?.reward_token_balance) >= GAME_COST
              ? "Pay to play"
              : "Insuffient funds"}
          </Button>
        ) : (
          <Button onClick={openModal}>Connect wallet to pay</Button>
        )}
      </div>
    </Modal>
  );
}
