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
import { Skeleton } from "../shadcn-component/skeleton";

export const RoomDisplayer = () => {
  const {isLogged, setIsLogged} = useLogged();
  const [room, setRoom] = useState<Room>();
  const params = useParams();
  const roomId = params.roomId as string;
  const { data: session, isPending } = authClient.useSession();
  const [isOwner, setIsOwner] = useState<boolean>();
  const { userData } = useUser();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();


  useEffect(() => {
    const fetchRoom = async () => {
      setLoading(true);
      const fetchedRoom: Room = await fetchRoomById(roomId);
      setRoom(fetchedRoom);
      setLoading(false);
    };

    if (!session) {
      setIsLogged(false)
    }
    if (session?.user.id === room?.openedBy.id) {
      setIsOwner(true);
      setIsLogged(true);
    } else {
      setIsOwner(false);
      setIsLogged(true);
    }
    fetchRoom();
  }, [router, roomId, session, userData, room?.openedBy.id, setIsLogged]);

  if (isPending || loading) {
    return (
      <div className="flex flex-col gap-2 m-1 w-full p-4">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

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
