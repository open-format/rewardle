import { create } from "zustand";
import { persist } from "zustand/middleware";

type ModalKeys =
  | "keyModal"
  | "scoresModal"
  | "launchPad"
  | "createConstellations"
  | "manageApp";

// These modals will only be shown once to the user.
type CompletedModalKeys = "launchPad" | "manageApp";

interface ModalState {
  modals: Record<ModalKeys, boolean>;
  completed: Record<CompletedModalKeys, boolean>;
  setModalState: (modalName: ModalKeys, state: boolean) => void;
  toggleModal: (modalName: ModalKeys) => void;
  isLoadingModal: boolean;
  setIsLoadingModal: (state: boolean) => void;
}

// @TODO Fix ModalState type. It's an issue with persist.
export const useModalStore = create<ModalState>(
  persist(
    (set) => ({
      isLoadingModal: false,
      setIsLoadingModal: (state: boolean) =>
        set({ isLoadingModal: state }),
      completed: {
        launchPad: false,
        manageApp: false,
      },
      modals: {
        keyModal: false,
        scoresModal: false,
        launchPad: true,
        createConstellations: false,
        manageApp: true,
      },
      setModalState: (modalName, state) =>
        set((prev) => ({
          modals: { ...prev.modals, [modalName]: state },
        })),
      toggleModal: (modalName) =>
        set((prev) => ({
          modals: {
            ...prev.modals,
            [modalName]: !prev.modals[modalName],
          },
          completed: {
            ...prev.completed,
            [modalName]: true,
          },
        })),
    }),
    {
      name: "modal-storage", // unique name
      getStorage: () => localStorage, // (optional) by default the 'localStorage' is used
      partialize: (state) => ({
        completed: state.completed,
      }),
    }
  )
);
