import { usePrivy } from "@privy-io/react-auth";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { MissionConfig } from "../@types";
import Quests from "../components/Quests";
import apiClient from "../utils/apiClient";

export default function QuestsPage() {
  const { user } = usePrivy();
  const address = user?.wallet?.address;

  const {
    data: quests,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["quests"],
    queryFn: fetchQuests,
  });

  useEffect(() => {
    if (address) {
      refetch();
    }
  }, [address]);

  async function fetchQuests(): Promise<MissionConfig[]> {
    return await apiClient
      .get(`/missions?user=${address}`)
      .then((res) => res.data.missions)
      .catch((err) => console.log({ err }));
  }

  return (
    <section>
      <Quests quests={quests} isLoading={isLoading} />
    </section>
  );
}
