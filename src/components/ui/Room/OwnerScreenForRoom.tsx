"use client";
import { Room } from "@/types/db";
import { CircleX, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { PlayerList } from "./PlayerList";
import { Button } from "../button";

type OwnerScreenForRoomProps = {
  room: Room | undefined;
};

export const OwnerScreenForRoom = ({ room }: OwnerScreenForRoomProps) => {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-4 p-4 md:p-6 mx-2 md:mx-1 w-full rounded-lg shadow-md">
      <h2 className="text-xl md:text-2xl font-bold">About your session</h2>

      <p className="text-sm md:text-base">
        <span className="font-semibold">Title:</span> {room?.title}
      </p>

      <p className="text-sm md:text-base">
        <span className="font-semibold">Owner:</span>{" "}
        <span
          className="underline cursor-pointer text-blue-600 dark:text-blue-400"
          onClick={() => {
            router.push("/user/" + room?.openedBy.id);
          }}
        >
          {room?.openedBy.username || room?.openedBy.email}
        </span>
      </p>

      <p className="text-sm md:text-base">
        <span className="font-semibold">Questions:</span> {room?.questions.length}
      </p>

      <p className="flex flex-row items-center gap-2 text-sm md:text-base">
        <span className="font-semibold">Status:</span>{" "}
        {room?.winner ? <CircleX className="text-red-500" /> : <RefreshCw className="text-green-500 animate-spin" />}
      </p>

      <p className="text-sm md:text-base">
        <span className="font-semibold">Winner:</span> {room?.winner?.email || "No winner yet"}
      </p>

      <div className="flex flex-col gap-2 max-h-60 overflow-auto">
        <span className="font-semibold">List of players:</span>
        <PlayerList players={room?.players} />
      </div>

      <div className="flex flex-col md:flex-row gap-2 mt-2">
        <Button className="flex-1">Start</Button>
        <Button className="flex-1" variant="destructive">
          Delete room
        </Button>
      </div>
    </div>
  );
};
