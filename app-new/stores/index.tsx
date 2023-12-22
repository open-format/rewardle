import { ProfileData } from "@/@types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ProfileState {
  profileData: ProfileData | null;
  setProfileData: (data: ProfileData) => void;
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      profileData: null,
      setProfileData: (data) => set({ profileData: data }),
    }),
    {
      name: "profile-storage",
    }
  )
);
