import { auth } from "@/lib/auth";
import { quitRoom } from "@/services/room";
import { headers } from "next/headers";
import {  NextResponse } from "next/server";

export const PUT = async (req: Request, context: RouteContext<"/api/rooms/[id]/players/[userId]">) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const params = await context.params;
    const roomId: string = params.id;
    const userId: string = params.userId;
    await quitRoom(roomId, userId);
    return NextResponse.json(
      {
        message: "User removed successfully",
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
