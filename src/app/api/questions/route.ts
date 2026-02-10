import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    try {
        const numberOfQuestionQueryNotFormatted =
            req?.nextUrl?.searchParams?.get("numberOfQuestion") || "null";

        let questions;

        if (numberOfQuestionQueryNotFormatted === "null") {
            if (req?.nextUrl?.searchParams?.get("search") != null) {
                if (req?.nextUrl?.searchParams?.get("typeId") != null) {
                    const search = req?.nextUrl?.searchParams?.get("search");
                    const typeId = req?.nextUrl?.searchParams?.get("typeId");
                    questions = await prisma.question.findMany({
                        where:
                            search && typeId
                                ? {
                                      question: {
                                          contains: search,
                                          mode: "insensitive",
                                      },
                                      typeId: typeId,
                                      isValidated: true,
                                  }
                                : undefined,
                        orderBy: { typeId: "asc" },
                    });
                    return NextResponse.json(
                        { data: questions },
                        { status: 200 },
                    );
                }
                const search = req?.nextUrl?.searchParams?.get("search");
                questions = await prisma.question.findMany({
                    where: search
                        ? {
                              question: {
                                  contains: search,
                                  mode: "insensitive",
                              },
                              isValidated: true,
                          }
                        : undefined,
                    orderBy: { typeId: "asc" },
                });
                return NextResponse.json({ data: questions }, { status: 200 });
            } else {
                if (req?.nextUrl?.searchParams?.get("typeId") != null) {
                    const typeId = req?.nextUrl?.searchParams?.get("typeId");
                    questions = await prisma.question.findMany({
                        where: typeId
                            ? { typeId: typeId, isValidated: true }
                            : undefined,
                        orderBy: { typeId: "asc" },
                    });
                    return NextResponse.json(
                        { data: questions },
                        { status: 200 },
                    );
                }
            }

            questions = await prisma.question.findMany({
                where: { isValidated: true },
                orderBy: { typeId: "asc" },
            });
        } else {
            const numberOfQuestion = parseInt(
                numberOfQuestionQueryNotFormatted,
            );
            questions = await prisma.$queryRaw`
        SELECT * FROM "public"."Question"
        WHERE "isValidated" = true
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
