import { create } from "zustand";

type LoggedStore = {
  isLogged: boolean;
  setIsLogged: (isLogged: boolean) => void;
};

export const useLogged = create<LoggedStore>((set) => ({
  isLogged: false,
  setIsLogged: (isLogged: boolean) => set({ isLogged }),
}));
