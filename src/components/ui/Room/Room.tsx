'use client'
import { Button } from "../button";
import { GameList } from "./GameList";
import { useRouter } from "next/navigation";

export const Room = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center gap-4 m-3">
      <h2 className="">Explore various games...</h2>
      <GameList />
      <Button variant='default' onClick={() => router.push('/room/create')}>Create</Button>
    </div>
  );
};
