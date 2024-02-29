import { TOKEN_NAME } from "constants/global";
import Modal, { Props as ModalProps } from "./Modal";

export type Props = Pick<ModalProps, "open" | "onClose">;

export default function IntroductionModal(props: Props) {
  return (
    <Modal title="Welcome" open={props.open} onClose={props.onClose}>
      <div className="space-y-2">
        <p>
          Welcome to Rewardle. The word game you know and love, but including
          Rewards and Quests.
        </p>
        <p>
          Login to start receiving rewards. Don&apos;t worry, you can still play
          without logging in, however you will miss out on XP, ${TOKEN_NAME} and
          Badges.
        </p>
        <p>Enjoy!</p>
      </div>
    </Modal>
  );
}
