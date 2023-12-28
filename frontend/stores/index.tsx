import { ProfileData } from "@/@types";
import { create } from "zustand";

interface ProfileState {
  profileData: ProfileData | null;
  setProfileData: (data: ProfileData) => void;
  resetProfileData: () => void;
}

export const useProfileStore = create<ProfileState>()((set) => ({
  profileData: null,
  setProfileData: (data) => set({ profileData: data }),
  resetProfileData: () => set({ profileData: null }),
}));
