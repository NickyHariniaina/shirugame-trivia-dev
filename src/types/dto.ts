import { Question } from "./db";

export type RoomDto = {
  title: string;
  questions: Question[];
};

// I created this one for BetterAuth
export type UserDto = {
  id: string;
  name: string;
  username?: string;
  rank?: number;
  highestScore?: number;
  email: string;
  emailVerified: boolean;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
};
