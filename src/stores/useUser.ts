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
    const url = `/api/users/${id}`;
    const response = await fetch(url, {
      method: "GET",
    })
    const data = await response.json();
    console.log(data.data);
    set({ userData: data.data })
  },
  setUserAccount: async (id: string) => {
    const url = `/api/users/${id}/account`;
    const response = await fetch(url, {
      method: "GET",
    })
    const data = await response.json();
    console.log(data.data);
    set({ userAccount: data.data })
  },
  setUserSession: async (id: string) => {
    const url = `/api/users/${id}/session`;
    const response = await fetch(url, {
      method: "GET",
    })
    const data = await response.json();
    console.log(data.data);
    set({ userSession: data.data })
  },
}));
