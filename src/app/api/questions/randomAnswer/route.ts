import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
export const GET = async () => {
  try {
    const answers = await prisma.$queryRaw`
      SELECT "Answer" FROM "public"."Question"
      ORDER BY RANDOM()
      LIMIT 3;
    `
    return NextResponse.json({ data: answers}, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          "Something went wrong while fetching questions, please try again later " +
          error,
      },
      { status: 500 },
    );
  }

}
