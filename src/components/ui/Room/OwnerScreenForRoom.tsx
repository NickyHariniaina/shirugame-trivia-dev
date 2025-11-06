'use client';
import { Room } from "@/types/db";
import { CircleX, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { PlayerList } from "./PlayerList";
import { Button } from "../button";

type OwnerScreenForRoomProps = {
  room: Room | undefined;
};

export const OwnerScreenForRoom = (props: OwnerScreenForRoomProps) => {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-3 m-2 items-start p-2">
      <h2>About your session</h2>
      <p>Title: {props.room?.title}</p>
      <div className="">
        Owner:{" "}
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
      <p className="flex flex-row gap-3 ">
        Status: {props.room?.winner ? <CircleX /> : <RefreshCw />}
      </p>
      <p>Winner: {props.room?.winner?.email || "No winner yet"}</p>
      <div className="p-3">
        List of players: <br />
        <PlayerList players={props.room?.players} />
      </div>
      <Button className='w-[100%]'>Start</Button>
      <Button
        className="w-[100%]"
        variant='destructive'
      >
        Delete room
      </Button>
    </div>
  );
};
