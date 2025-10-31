import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createRoom } from "@/services/room";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export const GET = async () => {
  try {
    const rooms = await prisma.room.findMany({
      include: {
        openedBy: true,
        players: true,
        questions: true,
      },
    });

    return NextResponse.json({data: rooms});

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export const POST = async (req: Request) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    const data = await req.json();
    const userId = session.user.id;
    await createRoom(data, userId);
    return NextResponse.json({ message: "Room created successfully" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
