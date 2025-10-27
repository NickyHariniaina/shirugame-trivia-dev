import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const criteria = req.nextUrl.searchParams.get("criteria") || "createdAt";

    const allowedFields = ["username", "email", "createdAt", "rank", "highestScore"];
    const sortBy = allowedFields.includes(criteria) ? criteria : "createdAt";

    const users = await prisma.user.findMany({
      orderBy: { [sortBy]: "asc" },
    });

    return NextResponse.json({ data: users }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
};
