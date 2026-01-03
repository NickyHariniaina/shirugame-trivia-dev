import { prisma } from "@/lib/prisma";
import { Question } from "@/types/db";
import { RoomDto } from "@/types/dto";

export const createRoom = async (data: RoomDto, userId: string) => {
  const questionsId: { id: string }[] = data.questions.map(
    (question: Question) => {
      return { id: question.id };
    },
  );

  // FIXME: Replace the data.title as the id later. It should be something more secure
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
      },
    },
  });
};

export const getRoomById = async (roomId: string) => {
  const room = await prisma.room.findUnique({
    where: {
      id: roomId,
    },
    include: {
      openedBy: true,
      questions: true,
      winner: true,
      players: true,
    },
  });

  return room;
};

export const insertUserInRoom = async (roomId: string, userId: string) => {
  await prisma.room.update({
    where: {
      id: roomId,
    },
    data: {
      players: {
        connect: [{ id: userId }],
      },
    },
  });
};

export const quitRoom = async (roomId: string, userId: string) => {
  await prisma.room.update({
    where: {
      id: roomId,
    },
    data: {
      players: {
        disconnect: [{ id: userId }],
      },
    },
  });
};

export const deleteRoom = async (roomId: string) => {
  await prisma.room.delete({
    where: {
      id: roomId,
    },
  });
};

