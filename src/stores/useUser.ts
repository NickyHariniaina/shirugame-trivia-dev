import { User } from "@/types/db";
import { create } from "zustand";

type UserStore = {
  userData: User | null;
  setUserData: (userData: User) => void;
};

export const useUser = create<UserStore>((set) => ({
  userData: null,
  setUserData: (userData: User) => {
    set({userData: userData})
  }
}));
