import next from "next";
import { Server } from "socket.io";
import { createServer } from "node:http";
import { prisma } from "./src/lib/prisma.mjs";

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer(handler);

  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["POST", "GET"],
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    // Join a room
    socket.on("joinRoom", async ({ roomId, userId }) => {
      socket.join(roomId);
      console.log(`User ${userId} joined room ${roomId}`);

      // Optionally fetch last 50 messages from DB and send to this user
      const messages = await prisma.message.findMany({
        where: { roomId },
        orderBy: { createdAt: "asc" },
        take: 100,
        include: {
          sender: {
            select: {
              id: true,
              username: true,
              email: true,
              image: true,
              highestScore: true,
            },
          },
        },
      });
      socket.emit("roomMessages", messages);
    });

    // Leave a room
    socket.on("leaveRoom", ({ roomId, userId }) => {
      socket.leave(roomId);
      console.log(`User ${userId} left room ${roomId}`);
    });

    // Send a message
    socket.on("sendMessage", async ({ roomId, userId, content}) => {
      // Save message to DB
      const message = await prisma.message.create({
        data: {
          roomId,
          senderId: userId,
          content,
        },
        include: {
          sender: {
            select: {
              id: true,
              username: true,
              email: true,
              image: true,
              highestScore: true,
            },
          },
        },
      });

      // Broadcast to everyone in the room
      io.to(roomId).emit("newMessage", message);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });

  server.on("error", (error) => {
    console.error(error);
    process.exit(1);
  });
});
