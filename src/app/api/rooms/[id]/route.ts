import { auth } from "@/lib/auth";
import { getRoomById } from "@/services/room";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  _req: NextRequest,
  context: RouteContext<"/api/rooms/[id]">,
) => {
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
    const { id: roomId } = await context.params;
    const room = await getRoomById(roomId);
    return NextResponse.json(
      {
        data: room,
      },
      { status: 200 },
    );
  } catch (error) {
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

export const DELETE = async (
  _req: NextRequest,
  context: RouteContext<"/api/rooms/[id]">,
) => {
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
