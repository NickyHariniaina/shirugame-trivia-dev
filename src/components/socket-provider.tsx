"use client";

import { useEffect } from "react";
import { getSocket } from "@/lib/socket-client";

export default function SocketProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const socket = getSocket();
        socket.on("connect", () => {
            console.log("connected");
        });
        socket.on("disconnect", () => {
            console.log("disconnected");
        });
        return () => {
            socket.disconnect();
        };
    }, []);

    return <>{children}</>;
}
