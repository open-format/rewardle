import apiClient from "utils/apiClient";
import create from "zustand";
import { ProfileData } from "../@types";

interface ProfileState {
  profileData: ProfileData | null;
  setProfileData: (data: ProfileData) => void;
  updateProfileData: () => void;
  resetProfileData: () => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  profileData: null,
  setProfileData: (data) => set({ profileData: data }),
  resetProfileData: () => set({ profileData: null }),
  updateProfileData: async () => {
    await apiClient.get("/profile/me").then((res) => {
      set({ profileData: res.data.data });
    });
  },
}));
