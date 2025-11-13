import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  _req: NextRequest,
  context: RouteContext<"/api/users/[id]">,
) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id: userId } = await context.params;
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        accounts: true,
        sessions: true,
        openedRooms: true,
        wonRooms: true,
        joinedRooms: true,
      },
    });

    return NextResponse.json(
      {
        data: user,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      {
        status: 500,
      },
    );
  }
};

