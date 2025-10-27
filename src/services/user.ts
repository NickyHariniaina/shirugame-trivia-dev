import { prisma } from "@/lib/prisma";

export const updateUserProfile = async (id: string, url: string) => {
  try {
    await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        image: url,
      },
    });
  } catch (error) {
    console.log(error);
  }
}

export const updateUserRank = async (id: string, rank: number) => {
  try {
    await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        rank: rank,
      },
    });
  } catch (error) {
    console.log(error);
  }
}

export const updateHighScore = async (id: string, score: number) => {
  try {
    await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        highestScore: score,
      },
    });
  } catch (error) {
    console.log(error);
  }
}

