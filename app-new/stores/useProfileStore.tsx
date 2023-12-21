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
        });
      },
      setProfileData: (profileData) =>
        set({
          profileData,
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
