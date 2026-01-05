"use client";

import { authClient } from "@/lib/auth-client";
import { Room } from "@/types/db";
import { fetchRoomById } from "@/utils/func";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PlayerScreenForRoom } from "./PlayerScreenForRoom";
import { OwnerScreenForRoom } from "./OwnerScreenForRoom";
import { useLogged } from "@/stores/useLogged";
import { YouNeedAnAccount } from "../ChoreComponent/YouNeedAnAccount";

export const RoomDisplayer = () => {
  const { isLogged, setIsLogged } = useLogged();
  const [room, setRoom] = useState<Room | null>(null);
  const [isOwner, setIsOwner] = useState(false);

  const params = useParams();
  const roomId = params.roomId as string;
  const { data: session } = authClient.useSession();

  /**
   * 1️⃣ Fetch room ONCE (or when roomId changes)
   */
  useEffect(() => {
    if (!roomId) return;

    const fetchRoom = async () => {
      const fetchedRoom = await fetchRoomById(roomId);
      setRoom(fetchedRoom);
    };

    fetchRoom();
  }, [roomId]);

  /**
   * 2️⃣ Handle auth + ownership logic
   */
  useEffect(() => {
    if (!session) {
      setIsLogged(false);
      setIsOwner(false);
      return;
    }

    setIsLogged(true);

    if (room && session.user.id === room.openedBy.id) {
      setIsOwner(true);
    } else {
      setIsOwner(false);
    }
  }, [session, room, setIsLogged]);

  /**
   * 3️⃣ Render guards
   */
  if (isLogged === false) {
    return <YouNeedAnAccount />;
  }

  if (!room) {
    return null; // or a loader
  }

  return (
    <div className="flex flex-col gap-2 m-1 w-full p-4">
      {isOwner ? (
        <OwnerScreenForRoom room={room} />
      ) : (
        <PlayerScreenForRoom room={room} />
      )}
    </div>
  );
};
