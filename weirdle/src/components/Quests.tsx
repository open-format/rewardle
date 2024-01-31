import { MissionConfig } from "@/@types";

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
      <ul className="grid grid-cols-4 gap-5">
        {quests && quests.length ? (
          quests.map((quest, index) => (
            <li key={`quest-${index}`}>
              <article>
                <div>
                  <div>
                    <h3>{quest.id}</h3>
                    <p>{quest.description}</p>
                  </div>
                  <img src={quest.badgeUrl} />
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
