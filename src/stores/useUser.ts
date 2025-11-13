import { User } from "@/types/db";
import { UserDto } from "@/types/dto";
import { fetchMissingField } from "@/utils/func";
import { create } from "zustand";

type UserStore = {
  userData: User | null;
  setUserData: (userData: UserDto | undefined) => void;
};

export const useUser = create<UserStore>((set) => ({
  userData: null,
  setUserData: async (userData: UserDto | undefined) => {
    if (!userData) {
      throw new Error();
    }
    const userId = userData.id;
    const realUserData = await fetchMissingField(userId);
    console.log(realUserData);
    const user = {
      sessions: realUserData.sessions,
      accounts: realUserData.accounts,
      openedRooms: realUserData.openedRooms,
      wonRooms: realUserData.wonRooms,
      joinedRooms: realUserData.joinedRooms,
      ...userData,
    };
    set({ userData: user });
  },
}));
