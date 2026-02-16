import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (
    req: NextRequest,
    context: RouteContext<"/api/admin/users/[id]/role">,
) => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session || session.user.role !== "admin") {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const { id: userId } = await context.params;
        const { role } = await req.json();

        if (!role || !["user", "admin"].includes(role)) {
            return NextResponse.json(
                { message: "Role must be either 'user' or 'admin'" },
                { status: 400 },
            );
        }

        // Prevent admin from demoting themselves
        if (userId === session.user.id) {
            return NextResponse.json(
                { message: "You cannot change your own role" },
                { status: 400 },
            );
        }

        await prisma.user.update({
            where: { id: userId },
            data: { role },
        });

        return NextResponse.json(
            { message: `User role updated to ${role}` },
            { status: 200 },
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
};
