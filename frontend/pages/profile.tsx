import { MissionConfig } from "@/@types";
import Profile from "@/components/Profile";
import Quests from "@/components/Quests";
import { useProfileStore } from "@/stores";
import apiClient from "@/utils/apiClient";
import { useQuery } from "@tanstack/react-query";

export default function ProfilePage() {
  const { profileData } = useProfileStore();

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
      (completedMission) =>
        completedMission.metadata.name === quest.id
    )
  );

  return (
    <>
      <Profile />
      <Quests
        title="Completed Quests"
        quests={completedQuests}
        isLoading={isLoading}
      />
    </>
  );
}
