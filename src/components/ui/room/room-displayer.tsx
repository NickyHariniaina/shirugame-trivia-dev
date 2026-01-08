"use client";
import { authClient } from "@/lib/auth-client";
import { Room } from "@/types/db";
import { fetchRoomById } from "@/utils/func";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PlayerScreenForRoom } from "./player-screen-for-room";
import { OwnerScreenForRoom } from "./owner-screen-for-room";
import { useUser } from "@/stores/useUser";
import { useRouter } from "next/navigation";
import { useLogged } from "@/stores/useLogged";
import { YouNeedAnAccount } from "../chore-component/you-need-an-account";

export const RoomDisplayer = () => {
  const {isLogged, setIsLogged} = useLogged();
  const [room, setRoom] = useState<Room>();
  const params = useParams();
  const roomId = params.roomId as string;
  const { data: session } = authClient.useSession();
  const [isOwner, setIsOwner] = useState<boolean>();
  const { userData } = useUser();
  const router = useRouter();


  useEffect(() => {
  const fetchRoom = async () => {
    const fetchedRoom: Room = await fetchRoomById(roomId);
    setRoom(fetchedRoom);
  };

    if (!session) {
      setIsLogged(false)
    }
    if (session?.user.id === room?.openedBy.id) {
      console.log("isOwner");
      setIsOwner(true);
      setIsLogged(true);
    } else {
      setIsOwner(false);
      setIsLogged(true);
    }
    fetchRoom();
  }, [router, roomId, session, userData, room?.openedBy.id, setIsLogged]);

  if (!isLogged || !session) return <YouNeedAnAccount />;

  return (
    <div className="flex flex-col gap-2 m-1 w-full p-4">
      {isOwner ? (
        <OwnerScreenForRoom room={room} />
      ) : (
        <PlayerScreenForRoom room={room} session={session}/>
      )}
    </div>
  );
};
