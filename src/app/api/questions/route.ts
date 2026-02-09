import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const numberOfQuestionQueryNotFormatted =
      req?.nextUrl?.searchParams?.get("numberOfQuestion") || "null";

    let questions;

    if (numberOfQuestionQueryNotFormatted === "null") {
      const limit = req?.nextUrl?.searchParams?.get("limit") || "10";
      const page = req?.nextUrl?.searchParams?.get("page") || "1";

        if (req?.nextUrl?.searchParams?.get("search") != null) {
            const search = req?.nextUrl?.searchParams?.get("search") || "null";
            questions = await prisma.question.findMany({
                where: {
                    question: {
                        contains: search,
                        mode: "insensitive",
                    },
                }
            });
            return NextResponse.json({ data: questions }, { status: 200 });
        }

      if (req?.nextUrl?.searchParams?.get("countPage") == "true") {
        const totalQuestions = await prisma.question.count();
        const maxPageNumber = totalQuestions / parseInt(limit)
        return NextResponse.json({ data: maxPageNumber }, { status: 200 });
      }

      const offset = (parseInt(page) - 1) * parseInt(limit);
      console.log(offset)
      questions = await prisma.$queryRaw`
        SELECT * FROM "public"."Question"
        ORDER BY "typeId"
        LIMIT ${parseInt(limit)}
        OFFSET ${offset}
      `;
    } else {
      const numberOfQuestion = parseInt(numberOfQuestionQueryNotFormatted);
      questions = await prisma.$queryRaw`
        SELECT * FROM "public"."Question"
        ORDER BY RANDOM()
        LIMIT ${numberOfQuestion}
      `;
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
