import Modal, { Props as ModalProps } from "./Modal";

export type Props = Pick<ModalProps, "open" | "onClose">;

export default function PaywallModal(props: Props) {
  return (
    <Modal title="Paywall" open={props.open} onClose={props.onClose}>
      <div>Winner</div>
      <div>Wait until tomorrow or</div>
      <button onClick={props.handlePayment}>Pay to play</button>
    </Modal>
  );
}
