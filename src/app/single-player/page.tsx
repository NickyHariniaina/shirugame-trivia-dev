import { RoomHeader } from "@/components/ui/room/room-header";
import { SinglePlayerMode } from "@/components/ui/room/single-player-mode";

const Page = () => {
  return <div className="flex flex-col gap-3">
    <RoomHeader targetedRedirect="/" />
    <SinglePlayerMode />
  </div>
}

export default Page;
