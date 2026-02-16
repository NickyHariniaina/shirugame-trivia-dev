import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export const GET = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session || session.user.role !== "admin") {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const questions = await prisma.question.findMany({
            where: {
                isValidated: false,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        username: true,
                    },
                },
                type: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });

        return NextResponse.json({ data: questions }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
};
