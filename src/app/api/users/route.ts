import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {

  try {
    const criteria = req?.nextUrl?.searchParams?.get("criteria") || "createdAt";
    console.log(criteria)

    const allowedFields = ["username", "email", "createdAt", "rank", "highestScore"];
    const sortBy = allowedFields.includes(criteria) ? criteria : "createdAt";

    const users = await prisma.user.findMany({
      orderBy: { [sortBy]: "asc" },
      where: {
        rank: {
          gt: 0,
        },
      },
    });

    return NextResponse.json({ data: users }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
};
