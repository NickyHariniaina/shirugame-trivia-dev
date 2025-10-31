import { Question } from "./db";

export type RoomDto = {
  title: string;
  questions: Question[];
};
