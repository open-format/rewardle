import { MissionConfig } from "@/@types";
import apiClient from "@/utils/apiClient";
import { useEffect, useState } from "react";

export default function QuestsPage() {
  const [quests, setQuests] = useState<MissionConfig[]>();

  useEffect(() => {
    async function fetchQuests() {
      await apiClient
        .get("/missions")
        .then((res) => setQuests(res.data.missions));
    }

    fetchQuests();
  }, []);

  return (
    <section aria-labelledby="quests-heading">
      <h2 id="quests-heading">Quests</h2>
      <ul>
        {quests?.map((quest, index) => (
          <li key={`quest-${index}`}>
            <article>
              <h3>{quest.id}</h3>
              <p>{quest.description}</p>
              <div>
                <h4>Requirements</h4>
                <ul>
                  {quest.requirements.map((requirement, reqIndex) => (
                    <li key={`requirement-${index}-${reqIndex}`}>
                      {requirement.actionId}: {requirement.count}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
