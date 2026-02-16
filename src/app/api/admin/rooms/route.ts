import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session || session.user.role !== "admin") {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const searchParams = req.nextUrl.searchParams;
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "20");
        const search = searchParams.get("search") || "";

        const where: Record<string, unknown> = {};

        if (search) {
            where.title = { contains: search, mode: "insensitive" };
        }

        const skip = (page - 1) * limit;

        const [rooms, total] = await Promise.all([
            prisma.room.findMany({
                where,
                skip,
                take: limit,
                orderBy: { startDate: "desc" },
                include: {
                    openedBy: {
                        select: {
                            id: true,
                            name: true,
                            username: true,
                            email: true,
                        },
                    },
                    winner: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                    _count: {
                        select: {
                            players: true,
                            questions: true,
                        },
                    },
                },
            }),
            prisma.room.count({ where }),
        ]);

        return NextResponse.json({
            data: rooms,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
};
