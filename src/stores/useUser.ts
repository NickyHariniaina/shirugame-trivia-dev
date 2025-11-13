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
    if (!userData) throw new Error("No user data");

    const userId = userData.id;
    const realUserData = await fetchMissingField(userId);
    const user = {
      ...realUserData,
      ...userData,
    };
    set({ userData: user });
  },
}));
