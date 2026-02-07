import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {

    // TODO: Add randomized parameters later
    const numberOfQuestionQueryNotFormatted=  req?.nextUrl?.searchParams?.get("numberOfQuestion") || "null";
    
    let questions;

    if (numberOfQuestionQueryNotFormatted === "null" ) {
      const limit = req?.nextUrl?.searchParams?.get("limit") || "10";
      const page = req?.nextUrl?.searchParams?.get("page") || "1";
      const offset = (parseInt(page) - 1) * parseInt(limit);
      questions = await prisma.$queryRaw`
        SELECT * FROM "public"."Question"
        ORDER BY "typeId"
        LIMIT ${parseInt(limit)}
        OFFSET ${offset}
      `
    } else {
      const numberOfQuestion = parseInt(numberOfQuestionQueryNotFormatted);
      questions = await prisma.$queryRaw`
        SELECT * FROM "public"."Question"
        ORDER BY RANDOM()
        LIMIT ${numberOfQuestion}
      `
    }
    return NextResponse.json({ data: questions }, { status: 200 });
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
