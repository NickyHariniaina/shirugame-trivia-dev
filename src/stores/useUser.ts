import { Account, Session, User } from "@/types/db";
import { create } from "zustand";

type UserStore = {
  userData: User | null;
  userSession: Session | null;
  userAccount: Account | null;
  setUserData: (id: string) => void;
  setUserSession: (id: string) => void;
  setUserAccount: (id: string) => void;
};

export const useUser = create<UserStore>((set, get) => ({
  userData: null,
  userSession: null,
  userAccount: null,
  setUserData: async (id: string) => {
    const response = await fetch("api/users", {
      method: "GET",
    })
    const data = await response.json();
    console.log(data);
  },
  setUserAccount: async (id: string) => {
    // TODO:
  },
  setUserSession: async (id: string) => {
    // TODO:
  },
}));
