import { RoomCreationBody } from "@/components/ui/room/room-creation-body";
import { RoomHeader } from "@/components/ui/room/room-header";

const Page = () => {
  return <div>
    <RoomHeader targetedRedirect="/room" />
    <RoomCreationBody />
  </div>;
}

export default Page;
