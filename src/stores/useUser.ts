import { User } from "@/types/db";
import { UserDto } from "@/types/dto";
import { create } from "zustand";

type UserStore = {
  userData: User | null;
  setUserData: (userData: UserDto | undefined) => void;
};

export const useUser = create<UserStore>((set) => ({
  userData: null,
  setUserData: (userData: UserDto | undefined) => {
    // Basic mapping
    if (!userData) {
      throw new Error();
    }
    const user = {
      sessions: [],
      accounts: [],
      openedRooms: [],
      wonRooms: [],
      joinedRooms: [],
      ...userData,
    };
    set({ userData: user });
  },
}));
