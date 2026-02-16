import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const { userId, header, body } = await req.json();

        if (!userId || !header || !body) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 },
            );
        }

        const notification = await prisma.notification.create({
            data: {
                userId,
                header,
                body,
                seen: false,
                isDeleted: false,
            },
        });

        return NextResponse.json(
            {
                message: "Notification created successfully",
                notification,
            },
            { status: 201 },
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 },
        );
    }
};
