import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const numberOfQuestionQueryNotFormatted=  req?.nextUrl?.searchParams?.get("numberOfQuestion") || "1";
    const numberOfQuestion = parseInt(numberOfQuestionQueryNotFormatted);
    const questions = await prisma.question.findMany({
      take: numberOfQuestion,
    });

    return NextResponse.json({ data: questions }, { status: 200});
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
};
