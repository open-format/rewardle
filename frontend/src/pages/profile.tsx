import { usePrivy } from "@privy-io/react-auth";
import { useQuery } from "@tanstack/react-query";
import { MissionConfig } from "../@types";
import Profile from "../components/Profile";
import Quests from "../components/Quests";
import { useProfileStore } from "../stores/index";
import apiClient from "../utils/apiClient";

export default function ProfilePage() {
  const { profileData } = useProfileStore();
  const { user } = usePrivy();

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

  const completedQuests = quests?.filter((quest) =>
    profileData?.completed_missions?.some(
      (completedMission: { metadata: { name: string } }) =>
        completedMission.metadata.name === quest.id
    )
  );

  return (
    <div className="space-y-5">
      <Profile />
      <Quests
        title="Completed Quests"
        quests={completedQuests}
        isLoading={isLoading}
      />
    </div>
  );
}
