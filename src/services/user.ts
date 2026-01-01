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
};

export const updateUserRank = async () => {
  try {
    // A special query for updating global rank.
    await prisma.$executeRaw`
    UPDATE "User"
    SET rank = (
      SELECT COUNT(*) + 1
      FROM "User" u2
      WHERE u2."highestScore" > "User"."highestScore"
    )
  `;
  } catch (error) {
    console.log(error);
  }
};

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
};
