import { prisma } from "@/lib/prisma";
import { Question } from "@/types/db";
import { RoomDto } from "@/types/dto";

export const createRoom = async (data: RoomDto, userId: string) => {
  const questionsId: {id: string}[] = data.questions.map((question: Question) => {
    return { id: question.id };
  });

  await prisma.room.create({
    data: {
      id: data.title,
      title: data.title,
      questions: {
        connect: questionsId,
      },
      openedById: userId,
      players: {
        connect: [{ id: userId }],
      }
    }
  })
}
