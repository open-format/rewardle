import Modal, { Props as ModalProps } from "./Modal";

export type Props = Pick<ModalProps, "open" | "onClose">;

export default function IntroductionModal(props: Props) {
  return (
    <Modal title="Welcome" open={props.open} onClose={props.onClose}>
      <div className="space-y-2">
        <p>
          Welcome to Rewardle. The wordle game you know and love, but including
          Rewards and Quests.
        </p>
        <p>
          Login to start receiving rewards. Don&apos;t worry, you can still play
          without logging in, however you will miss out on XP, $WORDLE and
          Badges.
        </p>
        <p>Enjoy!</p>
      </div>
    </Modal>
  );
}
