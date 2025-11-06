import { User } from "@/types/db";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Separator } from "../separator";

type PlayerListProps = {
  players: User[] | undefined;
};

export const PlayerList = (props: PlayerListProps) => {
  return (
    <ScrollArea className="flex flex-col gap-2 rounded-md border p-4 h-40 my-4">
      {props.players?.map((player: User, index: number) => {
        return (
          <div key={index} className="flex gap-2 items-center">
            <p className='border-y py-2'>{player.username}</p>
          </div>
        );
      })}
    </ScrollArea>
  );
};
