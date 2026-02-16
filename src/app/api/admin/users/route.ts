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
        const role = searchParams.get("role") || "";
        const banned = searchParams.get("banned");

        const where: Record<string, unknown> = {};

        if (search) {
            where.OR = [
                { name: { contains: search, mode: "insensitive" } },
                { username: { contains: search, mode: "insensitive" } },
                { email: { contains: search, mode: "insensitive" } },
            ];
        }

        if (role) {
            where.role = role;
        }

        if (banned !== null && banned !== "") {
            where.banned = banned === "true";
        }

        const skip = (page - 1) * limit;

        const [users, total] = await Promise.all([
            prisma.user.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: "desc" },
                select: {
                    id: true,
                    name: true,
                    username: true,
                    email: true,
                    image: true,
                    role: true,
                    banned: true,
                    banReason: true,
                    banExpires: true,
                    highestScore: true,
                    rank: true,
                    createdAt: true,
                    _count: {
                        select: {
                            notifications: true,
                            openedRooms: true,
                            joinedRooms: true,
                        },
                    },
                },
            }),
            prisma.user.count({ where }),
        ]);

        return NextResponse.json({
            data: users,
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
