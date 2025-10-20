import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { User } from "@/types/db";
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

export const PUT = async (req: Request) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json(
      {
        error: "Unauthorized",
      },
      {
        status: 401,
      },
    );
  }

  try {
    const dataReceived: User = await req.json();
    const {
      id,
      sessions,
      openedRooms,
      wonRooms,
      joinedRooms,
      createdAt,
      accounts,
      ...dataToChange
    } = dataReceived;
    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        ...dataToChange,
      },
    });

    return NextResponse.json(
      {
        message: "User updated successfully.",
      },
      {
        status: 200,
      },
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
