import { always } from "ramda";
import { GameTile } from "stores/game";
import { match } from "ts-pattern";
import { GridRow } from "./Grid";
import Modal, { Props as ModalProps } from "./Modal";

export type Props = Pick<ModalProps, "open" | "onClose">;

export default function HelpModal(props: Props) {
  return (
    <Modal title="How to play" open={props.open} onClose={props.onClose}>
      <section className="grid gap-4">
        <header className="grid gap-2 md:gap-3">
          <h3 className="text-primary">
            Guess the <span className="font-bold">word</span> in 6 tries.
          </h3>
          <p className="text-sm">
            Each guess must be a valid 5 letter word. Hit the enter button to
            submit.
          </p>
          <p className="text-sm">
            After each guess, the color of the tiles will change to show how
            close your guess was to the word.
          </p>
        </header>
        <div className="grid gap-4 border-t py-4">
          <div className="font-medium">Examples</div>
          <div className="m-auto grid max-w-sm gap-4 text-center">
            <HelpItem word="weary" letter="w" variant="correct" />
            <HelpItem word="pills" letter="i" variant="present" />
            <HelpItem word="vague" letter="u" variant="absent" />
          </div>
        </div>
      </section>
    </Modal>
  );
}

function HelpItem(props: {
  word: string;
  letter: string;
  variant: GameTile["variant"];
}) {
  return (
    <div className="grid gap-4">
      <GridRow
        data={[...props.word].map((key, i) => ({
          children: key,
          cursor: { y: 0, x: i },
          variant: key === props.letter ? props.variant : "empty",
        }))}
      />
      <legend>
        The letter <span className="font-bold uppercase">{props.letter}</span>{" "}
        is{" "}
        {match(props.variant)
          .with("correct", always("in the word and in the correct spot"))
          .with("present", always("in the word but in the wrong spot"))
          .with("absent", always("not in the word in any spot"))
          .otherwise(always(""))}
      </legend>
    </div>
  );
}
