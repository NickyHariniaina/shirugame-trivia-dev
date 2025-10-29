import { GameList } from "./GameList";
export const Room = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="">Explore various games...</h2>
      <GameList />
    </div>
  );
};
