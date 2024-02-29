import { MissionConfig } from "@/@types";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { TOKEN_NAME } from "constants/global";
import { isRewardToken, isXP } from "utils/formatting";

interface QuestProps {
  quests: MissionConfig[] | undefined;
  isLoading: boolean;
  title?: string;
}
export default function Quests({
  quests,
  isLoading,
  title = "Quests",
}: QuestProps) {
  if (isLoading)
    return (
      <div aria-live="assertive" aria-busy="true">
        Loading...
      </div>
    );

  return (
    <section>
      <h2>{title}</h2>
      <ul className="grid grid-cols-1 gap-12 md:grid-cols-3">
        {quests && quests.length ? (
          quests.map((quest, index) => (
            <li key={`quest-${index}`} className={clsx("rounded border p-2")}>
              <article className="relative">
                {Boolean(quest.completed) && (
                  <div className="absolute z-10 flex h-full w-full items-center justify-center">
                    <CheckCircleIcon className="items-self-center h-16 w-16 text-green-500" />
                  </div>
                )}
                <div
                  className={clsx(
                    { "opacity-30": quest.completed },
                    "relative flex flex-col items-center space-y-5 text-center"
                  )}
                >
                  <img src={quest.badgeUrl} className="h-36 w-36" />
                  <h3>{quest.id}</h3>
                  <p>{quest.description}</p>
                  <div className="flex flex-col items-center">
                    <p>
                      <strong>Reward:</strong>
                    </p>
                    <div className="flex items-center">
                      {quest.tokens.map((reward, i) => {
                        if (isXP(reward.address)) {
                          return (
                            <div key={i} className="mr-1">
                              {reward.amount}{" "}
                              <span className="font-bold text-primary">XP</span>{" "}
                              +
                            </div>
                          );
                        }
                        if (isRewardToken(reward.address)) {
                          return (
                            <div key={i}>
                              {reward.amount}{" "}
                              <span className="font-bold text-primary">
                                ${TOKEN_NAME}
                              </span>
                            </div>
                          );
                        }
                      })}
                    </div>
                  </div>
                </div>
              </article>
            </li>
          ))
        ) : (
          <li>No Completed Quests</li>
        )}
      </ul>
    </section>
  );
}
