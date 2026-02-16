import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (
    req: NextRequest,
    context: RouteContext<"/api/admin/questions/[id]/validate">,
) => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session || session.user.role !== "admin") {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const { id: questionId } = await context.params;
        const { isValidated, score, typeId } = await req.json();

        if (typeof isValidated !== "boolean") {
            return NextResponse.json(
                { message: "isValidated must be a boolean" },
                { status: 400 },
            );
        }

        const updateData: { isValidated: boolean; Score?: number; typeId?: string } = {
            isValidated,
        };

        if (score !== undefined && typeof score === "number") {
            updateData.Score = score;
        }

        if (typeId !== undefined) {
            updateData.typeId = typeId || null;
        }

        await prisma.question.update({
            where: {
                id: questionId,
            },
            data: updateData,
        });

        return NextResponse.json(
            { message: `Question ${isValidated ? "approved" : "rejected"} successfully` },
            { status: 200 },
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
};
