import { useQuery } from "@tanstack/react-query";
import Quests from "./components/quests";
import apiClient from "./lib/apiClient";


export default function QuestsPage() {
  const { data: quests, isLoading } = useQuery({
    queryKey: ["quests"],
    queryFn: fetchQuests,
  });

  async function fetchQuests() {
    return await apiClient
      .get("/missions")
      .then((res) => res.data.missions)
      .catch((err) => console.log({ err }));
  }

  return <Quests quests={quests} isLoading={isLoading} />;
}

