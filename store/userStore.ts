import { create } from 'zustand';

interface UserStore {
  isAdmin: boolean;
  isUserSynced: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
  setIsUserSynced: (isUserSynced: boolean) => void;
  resetUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  isAdmin: false,
  isUserSynced: false,
  setIsAdmin: (isAdmin) => set({ isAdmin }),
  setIsUserSynced: (isUserSynced) => set({ isUserSynced }),
  resetUser: () => set({ isAdmin: false, isUserSynced: false }),
}));