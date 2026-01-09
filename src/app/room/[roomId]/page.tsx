import { RoomDisplayer } from "@/components/ui/room/room-displayer";
import { RoomHeader } from "@/components/ui/room/room-header";

const Page = () => {
  return <div className='flex flex-col justify-center items-center gap-3'>
    <RoomHeader targetedRedirect="/room" />
    <RoomDisplayer />
  </div>
}

export default Page;
