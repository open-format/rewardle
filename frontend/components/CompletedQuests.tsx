import { MissionConfig } from "@/@types";
import { useProfileStore } from "@/stores";
import apiClient from "@/utils/apiClient";
import { useQuery } from "@tanstack/react-query";

export default function CompletedQuests() {
  const { profileData } = useProfileStore();

  const { data: quests } = useQuery({
    queryKey: ["quests"],
    queryFn: fetchQuests,
  });

  async function fetchQuests(): Promise<MissionConfig[]> {
    return await apiClient
      .get("/missions")
      .then((res) => {
        console.log(res.data.missions);
        return res.data.missions;
      })
      .catch((err) => console.log({ err }));
  }

  const completedQuests = quests?.filter((quest) =>
    profileData?.completed_missions?.some(
      (completedMission) =>
        completedMission.metadata.name === quest.id
    )
  );

  return (
    <section id="achievements">
      <h2>Your Completed Quests</h2>

      {completedQuests && completedQuests.length ? (
        completedQuests.map((quest, index) => (
          <article key={index} className="achievement">
            <section className="achievement-content">
              <h3>{quest.id}</h3>
              <p>{quest.description}</p>
              <div className="payload">
                <p>
                  <strong>XP Earned:</strong>
                  {quest.tokens[0]?.amount}XP
                </p>
                <p>
                  <strong>Reward:</strong>
                  {quest.tokens[1]?.amount} $REWARD
                </p>
              </div>
            </section>
            <div className="badges">
              <img
                src={quest.badgeUrl}
                style={{ width: 250, borderRadius: "100%" }}
                alt="Badge 1 for Achievement 1"
              />
            </div>
            <section className="actions">
              <h4>Completed Actions</h4>
              <ul>
                {quest.requirements.map((requirement, i) => (
                  <li key={requirement.actionId + i}>
                    <span className="action-title">
                      {requirement.actionId}
                    </span>
                    <span className="action-description">
                      {requirement.description}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </article>
        ))
      ) : (
        <div>no completed quests</div>
      )}
    </section>
  );
}
