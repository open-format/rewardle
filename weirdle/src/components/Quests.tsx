import { MissionConfig } from "@/@types";
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
      <ul className="space-y-5">
        {quests && quests.length ? (
          quests.map((quest, index) => (
            <li key={`quest-${index}`} className="rounded border p-2">
              <article>
                <div className="flex justify-between">
                  <div className="space-y-5">
                    <h3>{quest.id}</h3>
                    <p>{quest.description}</p>
                    <div>
                      {quest.tokens.map((reward, i) => {
                        if (isXP(reward.address)) {
                          return (
                            <p key={i}>
                              <strong>XP Earned:</strong> {reward.amount} XP
                            </p>
                          );
                        }
                        if (isRewardToken(reward.address)) {
                          return (
                            <p key={i}>
                              <strong>Reward</strong> {reward.amount} $WORDLE
                            </p>
                          );
                        }
                      })}
                    </div>
                  </div>
                  <img src={quest.badgeUrl} className="h-36" />
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
