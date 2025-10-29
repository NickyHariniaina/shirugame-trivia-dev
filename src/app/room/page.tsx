import { RoomHeader } from "@/components/ui/Room/RoomHeader";
import { Room } from "@/components/ui/Room/Room";

const Page = () => {
  return <div className="flex flex-cow gap-3">
    <RoomHeader />
    <Room />
  </div>
};

export default Page;
