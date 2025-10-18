import { Account, Session, User } from "@/types/db";
import { create } from "zustand";

type UserStore = {
  userData: User | null;
  userSession: Session | null;
  userAccount: Account | null;
  fetchUserData: (id: string) => void;
  fetchUserSession: (id: string) => void;
  fetchUserAccount: (id: string) => void;
  setUserData: (id: string, bodyReq: User) => void;
};

export const useUser = create<UserStore>((set, get) => ({
  userData: null,
  userSession: null,
  userAccount: null,
  fetchUserData: async (id: string) => {
    const url = `/api/users/${id}`;
    const response = await fetch(url, {
      method: "GET",
    });
    const data = await response.json();
    console.log(data.data);
    set({ userData: data.data });
  },

  fetchUserAccount: async (id: string) => {
    const url = `/api/users/${id}/account`;
    const response = await fetch(url, {
      method: "GET",
    });
    const data = await response.json();
    console.log(data.data);
    set({ userAccount: data.data });
  },

  fetchUserSession: async (id: string) => {
    const url = `/api/users/${id}/session`;
    const response = await fetch(url, {
      method: "GET",
    });
    const data = await response.json();
    console.log(data.data);
    set({ userSession: data.data });
  },

  setUserData: async (id: string, bodyReq: User) => {
    const url = `api/users/${id}`;
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(bodyReq),
    });
    get().fetchUserData(id);
  },
}));
