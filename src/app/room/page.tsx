import { RoomHeader } from "@/components/ui/room/room-header";
import { Room } from "@/components/ui/room/room";

const Page = () => {
  return (
    <div className="flex flex-col gap-3">
      <RoomHeader targetedRedirect="/room" />
      <Room />
    </div>
  );
};

export default Page;
