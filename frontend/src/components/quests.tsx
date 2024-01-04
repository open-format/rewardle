interface QuestProps {
  quests: any;
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
    <section id="achievements">
      <h2>{title}</h2>
      <ul className="quests__list">
        {quests && quests.length ? (
          quests.map((quest, index) => (
            <li key={`quest-${index}`} className="quests__item">
              <article className="quest">
                <div className="quest__details">
                  <div>
                    <h3 className="quest__id">{quest.id}</h3>
                    <p className="quest__description">
                      {quest.description}
                    </p>
                  </div>
                  <img
                    src={quest.badgeUrl}
                    className="quest__image"
                  />
                </div>
               
              </article>
            </li>
          ))
        ) : (
          <li className="quests__item">No Quests Found.</li>
        )}
      </ul>
    </section>
  );
}
