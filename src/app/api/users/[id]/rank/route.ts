import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { updateUserRank } from "@/services/user";

export const PATCH = async (req: NextRequest, context: RouteContext<"/api/users/[id]/rank">) => {
  const session = await auth.api.getSession({
    headers: await headers(),
});

if (!session) {
  return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
}

  try {
    const { id: userId } = await context.params;
    const dataReceived = await req.json();
    const rank = dataReceived.rank;
    await updateUserRank();

    return NextResponse.json(
      {
        message: "User rank updated successfully.",
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
}
