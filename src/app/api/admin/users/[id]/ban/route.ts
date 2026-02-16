import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (
    req: NextRequest,
    context: RouteContext<"/api/admin/users/[id]/ban">,
) => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session || session.user.role !== "admin") {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const { id: userId } = await context.params;
        const { banned, reason, expiresAt } = await req.json();

        if (typeof banned !== "boolean") {
            return NextResponse.json(
                { message: "banned must be a boolean" },
                { status: 400 },
            );
        }

        // Prevent admin from banning themselves
        if (userId === session.user.id) {
            return NextResponse.json(
                { message: "You cannot ban yourself" },
                { status: 400 },
            );
        }

        const updateData: Record<string, unknown> = {
            banned,
        };

        if (banned) {
            updateData.banReason = reason || null;
            updateData.banExpires = expiresAt || null;
        } else {
            updateData.banReason = null;
            updateData.banExpires = null;
        }

        await prisma.user.update({
            where: { id: userId },
            data: updateData,
        });

        return NextResponse.json(
            { message: banned ? "User banned successfully" : "User unbanned successfully" },
            { status: 200 },
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
};
