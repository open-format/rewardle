import { ProfileData } from "@/@types";
import MISSIONS from "@/missions.json";
import apiClient from "@/utils/apiClient";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ProfileState {
  awardedBadges: Set<any>;
  completedActions: any;
  profileData: ProfileData | null;
  setProfileData: (state: ProfileData) => void;
  setAwardedBadges: (state: ProfileData) => void;
  refreshProfileData: () => void;
  resetProfileData: () => void;
}

export const useProfileStore = create<ProfileState>(
  persist(
    (set) => ({
      profileData: null,
      completedActions: null,
      awardedBadges: new Set(),
      setAwardedBadges: (profileData) => set({ profileData }),
      resetProfileData: () => set({ profileData: null }),
      refreshProfileData: async () => {
        const res = await apiClient.get("/profile/me");
        set({
          profileData: res.data,
          awardedBadges: getAwardedBadges(res.data),
          completedActions: getCompletedActions(res.data),
        });
      },
      setProfileData: (profileData) =>
        set({
          profileData,
          awardedBadges: getAwardedBadges(profileData),
          completedActions: getCompletedActions(profileData),
        }),
    }),
    {
      name: "profile-store", // unique name
      getStorage: () => localStorage,
      partialize: (state) => ({
        profileData: state.profileData,
      }),
    }
  )
);

function getAwardedBadges(profileData: ProfileData) {
  const newAwardedBadges = new Set();

  profileData?.missions?.forEach((res) => {
    const foundBadge = MISSIONS.find(
      (badge) => badge.id === res.metadata.name
    );
    if (foundBadge) {
      newAwardedBadges.add(foundBadge.id);
    }
  });

  return newAwardedBadges;
}

function getCompletedActions(profileData: ProfileData): {
  [missionId: string]: string[];
} {
  const newCompletedActionsByMission: {
    [missionId: string]: string[];
  } = {};

  MISSIONS.forEach((mission) => {
    const completedActions = mission.requirements
      ?.filter((req) => {
        const actionsForReq = profileData?.actions?.filter(
          (action) => action.metadata.name === req.actionId
        );
        return actionsForReq?.length >= req.count;
      })
      .map((req) => req.actionId);

    if (completedActions.length > 0) {
      newCompletedActionsByMission[mission.id] = completedActions;
    }
  });

  return newCompletedActionsByMission;
}
