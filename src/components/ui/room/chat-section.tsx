"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { io, Socket } from "socket.io-client";
import { ScrollArea } from "@/components/ui/shadcn-component/scroll-area";
import { Input } from "@/components/ui/shadcn-component/input";
import { Button } from "@/components/ui/shadcn-component/button";
import { Avatar } from "@/components/ui/profil/avatar";
import { Room, User } from "@/types/db";
import { Session } from "@/types/better-auth";

interface Message {
  id: string;
  content: string;
  createdAt: string;
  sender: User;
}

type FormValues = {
  content: string;
};

export const ChatSection = ({ room, session }: { room?: Room; session: Session }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const socketRef = useRef<Socket | null>(null);

  const { register, handleSubmit, reset } = useForm<FormValues>();

  useEffect(() => {
    if (!room || !session) return;

    if (!socketRef.current) {
      socketRef.current = io();
    }

    const socket = socketRef.current;

    socket.emit("joinRoom", {
      roomId: room.id,
      userId: session.user.id,
    });

    const onRoomMessages = (msgs: Message[]) => setMessages(msgs);
    const onNewMessage = (msg: Message) =>
      setMessages((prev) => [...prev, msg]);

    socket.on("roomMessages", onRoomMessages);
    socket.on("newMessage", onNewMessage);

    return () => {
      socket.emit("leaveRoom", {
        roomId: room.id,
        userId: session.user.id,
      });

      socket.off("roomMessages", onRoomMessages);
      socket.off("newMessage", onNewMessage);
    };
  }, [room?.id, session?.user.id]);

  const onSubmit = ({ content }: FormValues) => {
    if (!content.trim()) return;
    if (!socketRef.current) return; // 🔒 sécurité

    socketRef.current.emit("sendMessage", {
      roomId: room?.id,
      userId: session.user.id,
      content,
    });

    reset();
  };

  return (
    <div className="flex flex-col h-full border rounded p-2 gap-2">
      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center">
          <p>No messages yet... come back later</p>
        </div>
      ) : ( <ScrollArea className="flex-1 border rounded p-2 max-h-[400px] overflow-auto">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className="flex gap-2 items-start mb-2"
          >
            <Avatar
              src={msg.sender?.image || ""}
              alt={msg.sender?.username || ""}
              size={30}
            />

            <div className="flex flex-col max-w-full">
              <strong className="leading-tight">
                {msg.sender.username ?? msg.sender.email}
              </strong>

              <p className="break-words whitespace-pre-wrap">
                {msg.content}
              </p>
            </div>
          </div>
        ))}
      </ScrollArea>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
        <Input {...register("content")} placeholder="Type your message..." />
        <Button type="submit">Send</Button>
      </form>
    </div>
  );
};
