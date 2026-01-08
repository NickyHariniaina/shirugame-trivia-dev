import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, context: RouteContext<"/api/questions/[type]">) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { type: rawType } = await context.params;
    const numberOfQuestionQueryNotFormatted=  req?.nextUrl?.searchParams?.get("numberOfQuestion") || "1";
    const numberOfQuestion = parseInt(numberOfQuestionQueryNotFormatted);

    const type =
      rawType === "null" || rawType === "undefined" || !rawType
        ? null
        : rawType;

    console.log(rawType);

    const questions = type
      ? await prisma.$queryRaw`
          SELECT *
          FROM "public"."Question"
          WHERE "typeId" = ${type}
          ORDER BY RANDOM()
          LIMIT ${numberOfQuestion}
        `
      : await prisma.$queryRaw`
          SELECT *
          FROM "public"."Question"
          ORDER BY RANDOM()
          LIMIT ${numberOfQuestion}
        `;


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
