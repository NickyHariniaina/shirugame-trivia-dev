"use client";
import { Room, User } from "@/types/db";
import { useRouter } from "next/navigation";
import { Avatar } from "../Avatar";
import { Button } from "../button";

type PlayerScreenForRoomProps = {
  room: Room | undefined;
};

export const PlayerScreenForRoom = (props: PlayerScreenForRoomProps) => {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-1 m-2 items-center p-2">
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
      <p>Status: open</p>
      <p className='p-3'>
        List of players: <br />
        {props.room?.players.map((player: User) => {
          return (
            <span key={player.id}>
              <Avatar
                onClick={() => router.push("/user/" + player.id)}
                src={player.image || ""}
                alt={player.email}
              />
            </span>
          );
        })}
      </p>
      <Button>Join</Button>
    </div>
  );
};
