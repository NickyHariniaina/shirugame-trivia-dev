import { auth } from "@/lib/auth";
import { insertUserInRoom } from "@/services/room";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (
  req: NextRequest,
  context: RouteContext<"/api/rooms/[id]/players">,
) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await req.json();
    const params = await context.params;
    const roomId: string = params.id;
    const userId: string = data.userId;
    await insertUserInRoom(roomId, userId);
    return NextResponse.json(
      {
        message: "User inserted successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
};
