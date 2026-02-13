import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (
    req: NextRequest,
    context: RouteContext<"/api/notifications/[id]">,
) => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const { id: notificationId } = await context.params;
        const dataReceived = await req.json();

        // TODO: Update in case you need to add other field later
        const allowedFields = ["seen"];

        const filteredData = Object.fromEntries(
            Object.entries(dataReceived).filter(([key]) => allowedFields.includes(key)),
        );

        if (Object.keys(filteredData).length === 0) {
            return NextResponse.json(
                { message: "Invalid field" },
                { status: 400 },
            );
        }

        await prisma.notification.update({
            where: {
                id: notificationId,
            },
            data: dataReceived,
        });

        return NextResponse.json(
            {
                message: "Notification updated successfully",
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
};

export const DELETE = async (
    req: NextRequest,
    context: RouteContext<"/api/notifications/[id]">,
) => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const { id: notificationId } = await context.params;
        await prisma.notification.update({
            where: {
                id: notificationId,
            },
            data: { isDeleted: true },
        });
        return NextResponse.json(
            {
                message: "Notification deleted successfully",
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
};
