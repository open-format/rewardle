import { MissionConfig } from "../@types";
import Quests from "../components/Quests";
import apiClient from "../utils/apiClient";
import { useQuery } from "@tanstack/react-query";

export default function QuestsPage() {
  const { data: quests, isLoading } = useQuery({
    queryKey: ["quests"],
    queryFn: fetchQuests,
  });

  async function fetchQuests(): Promise<MissionConfig[]> {
    return await apiClient
      .get("/missions")
      .then((res) => res.data.missions)
      .catch((err) => console.log({ err }));
  }

  return <Quests quests={quests} isLoading={isLoading} />;
}
