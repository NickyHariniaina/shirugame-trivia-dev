import { Room, User } from "@/types/db";
import { useRouter } from "next/navigation";
import { Button } from "../shadcn-component/button";
import { PlayerList } from "./player-list";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { insertRoomPlayer } from "@/utils/func";
import { authClient } from "@/lib/auth-client";
import { CircleX, RefreshCw } from "lucide-react";
import { quitRoom } from "@/utils/func";
import { GameSection } from "./game-section";
import { Session } from "@/types/better-auth";

type PlayerScreenForRoomProps = {
  room: Room | undefined;
  session: Session
};

export const PlayerScreenForRoom = ({ room, session }: PlayerScreenForRoomProps) => {
  const [userInRoom, setGameStarted] = useState<boolean>(false);
  const router = useRouter();
  const [isUserInRoom, setIsUserInRoom] = useState<boolean>(false);

  const verifyUserInRoom = async () => {
    const inRoom = room?.players.some(
      (player: User) => player.id === session?.user.id
    );
    setIsUserInRoom(inRoom || false);
  };

  useEffect(() => {
    verifyUserInRoom();
  }, [room, session?.user.id]);

  const handleJoinRoom = async () => {
    try {
      if (isUserInRoom) {
        toast.error("You are already in this room.", { id: "errorId" });
        return;
      }
      await insertRoomPlayer(room?.id || "", session?.user.id || "");
      toast.success("You joined the room successfully.", { id: "successId" });
      setGameStarted(true);
      verifyUserInRoom();
    } catch (error) {
      console.log(error);
      toast.error("Error while joining the room, try again later...", { id: "errorId" });
    }
  };

  const handleLeaveRoom = async () => {
    try {
      await quitRoom(room?.id || "", session?.user.id || "");
      toast.success("You left the room successfully.", { id: "successId" });
      verifyUserInRoom(); // refresh state
      router.push("/room");
    } catch (error) {
      console.log(error);
      toast.error("Error while leaving the room, try again later...", { id: "errorId" });
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 md:p-6 mx-2 md:mx-1 w-full rounded-lg shadow-md">
      <h2 className="text-xl md:text-2xl font-bold" hidden={userInRoom}>About this session</h2>

      <p className="text-sm md:text-base" hidden={userInRoom}>
        <span className="font-semibold">Title:</span> {room?.title}
      </p>

      <p className="text-sm md:text-base" hidden={userInRoom}>
        <span className="font-semibold">Owner:</span>{" "}
        <span
          className="underline cursor-pointer text-blue-600 dark:text-blue-400"
          onClick={() => router.push("/user/" + room?.openedBy.id)}
        >
          {room?.openedBy.username || room?.openedBy.email}
        </span>
      </p>

      <p className="text-sm md:text-base" hidden={userInRoom}>
        <span className="font-semibold">Questions:</span> {room?.questions.length}
      </p>

      <p className="flex flex-row items-center gap-2 text-sm md:text-base" hidden={userInRoom}>
        <span className="font-semibold">Status:</span>{" "}
        {room?.winner ? (
          <CircleX className="text-red-500" />
        ) : (
          <RefreshCw className="text-green-500 animate-spin" />
        )}
      </p>

      <p className="text-sm md:text-base" hidden={userInRoom}>
        <span className="font-semibold">Winner:</span> {room?.winner?.email || "No winner yet"}
      </p>

      <div className="flex flex-col gap-2 max-h-60 overflow-auto" hidden={userInRoom}>
        <span className="font-semibold">List of players:</span>
        <PlayerList players={room?.players} />
      </div>

      <div className="flex flex-col md:flex-row gap-2 mt-2" hidden={userInRoom}>
        <Button
          className="flex-1"
          onClick={handleJoinRoom}
          disabled={isUserInRoom}
        >
          Let's start
        </Button>
        <Button
          className="flex-1"
          variant="secondary"
          onClick={handleLeaveRoom}
          disabled={!isUserInRoom}
        >
          Leave
        </Button>
      </div>

      <div id="game-section" hidden={!userInRoom}>
        <GameSection room={room} session={session}/>
      </div>
    </div>
  );
};
