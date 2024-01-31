import { toWei, useWallet } from "@openformat/react";
import { useProfileStore } from "stores";
import { Button } from "./Button";
import Modal, { Props as ModalProps } from "./Modal";

export type Props = Pick<ModalProps, "open" | "onClose">;

export default function PaywallModal(props: Props) {
  const { address } = useWallet();
  const { profileData } = useProfileStore();
  return (
    <Modal title="Pay to Play" open={props.open} onClose={props.onClose}>
      <div>
        You can either wait to play again tomorrow, or you can pay 1 $OFT to
        play again now.
      </div>

      {address ? (
        <Button
          onClick={props.handlePayment}
          isLoading={props.isLoading}
          disabled={!address || profileData?.reward_token_balance < toWei("1")}
        >
          {profileData?.reward_token_balance > toWei("1")
            ? "Pay to play"
            : "Insuffient funds"}
        </Button>
      ) : (
        <p>Connect your wallet to pay</p>
      )}
    </Modal>
  );
}
