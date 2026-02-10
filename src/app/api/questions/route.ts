import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
        // TODO: refactor this file later
        // TODODODODODODO: REFACTOR THIS FILE THIS WEEK
    const numberOfQuestionQueryNotFormatted =
      req?.nextUrl?.searchParams?.get("numberOfQuestion") || "null";

    let questions;

    if (numberOfQuestionQueryNotFormatted === "null") {
      const limit = req?.nextUrl?.searchParams?.get("limit") || "10";
      const page = req?.nextUrl?.searchParams?.get("page") || "1";


      if (req?.nextUrl?.searchParams?.get("countPage") == "true") {
        if (req?.nextUrl?.searchParams?.get("search") != null) {
            if (req?.nextUrl?.searchParams?.get("typeId") != null) {
                const search = req?.nextUrl?.searchParams?.get("search");
                const typeId = req?.nextUrl?.searchParams?.get("typeId");
                const totalQuestions = await prisma.question.count({
                    where: search && typeId ?
                        { question: { contains: search, mode: "insensitive" }, typeId: typeId }
                        : undefined
                });
                const maxPageNumber = totalQuestions / parseInt(limit)
                return NextResponse.json({ data: maxPageNumber }, { status: 200 });
            }
            const search = req?.nextUrl?.searchParams?.get("search");
            const totalQuestions = await prisma.question.count({
              where: search
                ? { question: { contains: search, mode: "insensitive" } }
                : undefined,
            });
            const maxPageNumber = totalQuestions / parseInt(limit)
            return NextResponse.json({ data: maxPageNumber }, { status: 200 });
        }
        const totalQuestions = await prisma.question.count();
        const maxPageNumber = totalQuestions / parseInt(limit)
        return NextResponse.json({ data: maxPageNumber }, { status: 200 });
      }

      const offset = (parseInt(page) - 1) * parseInt(limit);
        if (req?.nextUrl?.searchParams?.get("search") != null) {
            if (req?.nextUrl?.searchParams?.get("typeId") != null) {
                const search = req?.nextUrl?.searchParams?.get("search");
                const typeId = req?.nextUrl?.searchParams?.get("typeId");
                questions = await prisma.question.findMany({
                    where: search && typeId ?
                        { question: { contains: search, mode: "insensitive" }, typeId: typeId }
                        : undefined,
                    orderBy: { typeId: "asc" },
                    take: parseInt(limit),
                    skip: offset,
                });
                console.log(questions);
                return NextResponse.json({ data: questions }, { status: 200 });
            }
            const search = req?.nextUrl?.searchParams?.get("search");
                questions = await prisma.question.findMany({
                  where: search
                    ? { question: { contains: search, mode: "insensitive" } }
                    : undefined,
                  orderBy: { typeId: "asc" },
                  take: parseInt(limit),
                  skip: offset,
                });
                console.log(questions);
            return NextResponse.json({ data: questions }, { status: 200 });
        } else {
            if (req?.nextUrl?.searchParams?.get("typeId") != null) {
                const typeId = req?.nextUrl?.searchParams?.get("typeId");
                questions = await prisma.question.findMany({
                    where: typeId ?
                        { typeId: typeId }
                        : undefined,
                    orderBy: { typeId: "asc" },
                    take: parseInt(limit),
                    skip: offset,
                });
                console.log(questions);
                return NextResponse.json({ data: questions }, { status: 200 });
            }
        }

        questions = await prisma.question.findMany({
          orderBy: { typeId: "asc" },
          take: parseInt(limit),
          skip: offset,
        });
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

export const POST = async (req: NextRequest) => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        return NextResponse.json(
            {
                message: "Unauthorized",
            },
            {
                status: 401,
            },
        );
    }

    try {
        const data = await req.json();
        const question = data.question;
        const answer = data.answer;
        const userId = data.userId;
        return NextResponse.json(
            {
                message: "Question created successfully",
            },
            { status: 200 },
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                message: "Internal Server Error" + error,
            },
            {
                status: 500,
            },
        );
    }
};
