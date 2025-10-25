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
