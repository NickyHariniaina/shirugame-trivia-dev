"use client";

import { Socket, io } from "socket.io-client";
import { create } from "zustand";

interface SocketState {
    socket: Socket | null;
    isConnected: boolean;
    disconnect: () => void;
    connect: (userId: string | null) => void;
}

export const useSocketStore = create<SocketState>((set) => {
    if (typeof window === "undefined") {
        return {
            connect: () => {},
            socket: null,
            isConnected: false,
            disconnect: () => {},
        };
    }

    let socketInstance: Socket | null = null;

    const connect = (userId: string | null) => {
        if (socketInstance || userId == null) return;
        socketInstance = io(process.env.NEXT_SOCKET_BASE_URL, {
            path: "/socket.io/",
            transports: ["websocket", "polling"],
            autoConnect: true,
            reconnection: true,
            reconnectionAttempts: Infinity,
            reconnectionDelay: 1000,
        });

        socketInstance.on("connect", () => {
            set({ socket: socketInstance, isConnected: true });
        });

        socketInstance.on("disconnect", (reason) => {
            set({ isConnected: false });
        });

        socketInstance.on("connect_error", (err) => {});
    };

    const disconnect = () => {
        if (!socketInstance) return;
        socketInstance.disconnect();
        set({ socket: null, isConnected: false });
    };

    return {
        socket: socketInstance,
        isConnected: false,
        disconnect,
        connect,
    };
});
