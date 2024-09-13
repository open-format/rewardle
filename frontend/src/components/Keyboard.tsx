import { always, propEq } from "ramda";
import { useCallback, useEffect } from "react";
import type { GameTile } from "stores/game";
import tw from "tailwind-styled-components";
import { match } from "ts-pattern";
import { BackspaceIcon } from "./icons";

export const MAPPABLE_KEYS = {
  backspace: <BackspaceIcon />,
  enter: "ENTER",
} as const;

export type MappableKeys = keyof typeof MAPPABLE_KEYS;

export function isMappableKey(key: string): key is MappableKeys {
  return key in MAPPABLE_KEYS;
}

const KEYS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["", "A", "S", "D", "F", "G", "H", "J", "K", "L", ""],
  ["enter", "Z", "X", "C", "V", "B", "N", "M", "backspace"],
];

export const VALID_KEYS = KEYS.flatMap((row) =>
  row.map((key) => key.toLowerCase())
).filter(Boolean);

function isValidKey(key: string) {
  return VALID_KEYS.includes(key);
}

type Props = {
  onKeyPress: (key: string) => void;
  disabled?: boolean;
  usedKeys: Record<string, GameTile[]>;
};

export default function Keyboard({ onKeyPress, disabled, usedKeys }: Props) {
  useEffect(() => {
    function onKeyUp(e: KeyboardEvent) {
      if (e.key) {
        if (isValidKey(e.key.toLowerCase())) {
          onKeyPress(e.key.toLowerCase());
        }
      }
    }

    document.addEventListener("keyup", onKeyUp);

    return () => {
      document.removeEventListener("keyup", onKeyUp);
    };
  }, [onKeyPress]);

  const getKeyColors = useCallback(
    (key: string) => {
      if (key in usedKeys) {
        const tiles = usedKeys[key];
        const tile =
          tiles.find(propEq("variant", "correct")) ??
          tiles.find(propEq("variant", "present")) ??
          tiles.find(propEq("variant", "absent"));

        return {
          color: tile?.variant ? "white" : "black",
          background: match(tile?.variant ?? "empty")
            .with("absent", always("rgb(75 85 99)"))
            .with("correct", always("rgb(34 197 94)"))
            .with("present", always("rgb(234 179 8)"))
            .otherwise(always("")),
        };
      }

      return {};
    },
    [usedKeys]
  );

  return (
    <div className="m-5 mx-auto grid h-min select-none gap-4">
      {KEYS.map((row, i) => (
        <div
          className="flex touch-manipulation justify-evenly gap-2 md:gap-2"
          key={`row-${i}`}
        >
          {row.map((key, j) =>
            key === "" ? (
              <div key={`empty-${j}`} className="w-2" />
            ) : (
              <KeyButton
                disabled={disabled}
                key={key}
                onClick={onKeyPress.bind(null, key.toLowerCase())}
                style={
                  disabled ? { opacity: 0.5 } : getKeyColors(key.toLowerCase())
                }
              >
                {isMappableKey(key) ? MAPPABLE_KEYS[key] : key}
              </KeyButton>
            )
          )}
        </div>
      ))}
    </div>
  );
}

export const KeyButton = tw.button`
  bg-gray-800 hover:bg-gray-900 active:opacity-60 md:p-3 
   p-2 rounded-md md:text-xl sm:text-sm text-md font-bold transition-all 
   md:min-w-[2.5rem]
   min-w-[1.85rem]
`;
