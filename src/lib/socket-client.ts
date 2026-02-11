import { io, Socket } from "socket.io-client";

let socket: Socket;

export const createInstanceOfSocket = () => {
    if (!socket) {
        socket = io({
            autoConnect: false,
        });
    }
    return socket;
};
