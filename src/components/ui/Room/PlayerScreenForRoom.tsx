"use client";
import { Room, User } from "@/types/db";
import { useRouter } from "next/navigation";
import { Button } from "../button";
import { PlayerList } from "./PlayerList";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { insertRoomPlayer } from "@/utils/func";
import { authClient } from "@/lib/auth-client";
import { CircleX, RefreshCw } from "lucide-react";

type PlayerScreenForRoomProps = {
  room: Room | undefined;
};

export const PlayerScreenForRoom = (props: PlayerScreenForRoomProps) => {
  const session = authClient.useSession();
  const router = useRouter();
  const [ isUserInRoom, setIsUserInRoom ] = useState<boolean>(false);

  const verifyUserInRoom = async () => {
    const isUserInRoom = props.room?.players.find((player: User) => {
      return player.id === session?.data?.user.id;
    });

    // The ternary operator is needed cause here we might have an undefined value for isUserInRoom
    setIsUserInRoom(isUserInRoom? true: false);
  }

  const handleJoinRoom = () => {
    try {
      verifyUserInRoom();
      if (isUserInRoom) {
        toast.error("You are already in this room.", { id: "errorId" });
        return
      }
      const res = insertRoomPlayer(props.room?.id || "", session?.data?.user.id || "");
      console.log(res);
      toast.success("You joined the room successfully.", { id: "successId" });
    } catch (error) {
      console.log(error);
      toast.error("Error while joining the room, try again later...", {
        id: "errorId",
      });
    }

  };


  useEffect(() => {
    verifyUserInRoom();
  });

  return (
    <div className="flex flex-col gap-3 m-2 items-start p-2">
      <h2>About this session</h2>
      <p>Title: {props.room?.title}</p>
      <div className="">
        Owner: {" "}
        <span
          className="underline"
          onClick={() => {
            router.push("/user/" + props.room?.openedBy.id);
          }}
        >
          {props.room?.openedBy.username || props.room?.openedBy.email}
        </span>
      </div>
      <p>It contains {props.room?.questions.length} questions</p>
      <p className='flex flex-row gap-3 '>Status: {props.room?.winner? <CircleX />: <RefreshCw />}</p>
      <p>Winner: {props.room?.winner?.email || "No winner yet"}</p>
      <div className='p-3'>
        List of players: <br />
        <PlayerList players={props.room?.players} />
      </div>
      <Button disabled={isUserInRoom} onClick={handleJoinRoom} className='w-[100%]'>Join</Button>
    </div>
  );
};
