import { toWei, useSetIsWalletModalOpen, useWallet } from "@openformat/react";
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
          You can either wait to play again tomorrow, or you can pay 1 $OFT to
          play again now.
        </p>
        {address ? (
          <Button
            onClick={props.handlePayment}
            isLoading={props.isLoading}
            disabled={
              !address || profileData?.reward_token_balance < toWei("1")
            }
          >
            {profileData?.reward_token_balance > toWei("1")
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
