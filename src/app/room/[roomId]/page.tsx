import { RoomDisplayer } from "@/components/ui/Room/RoomDisplayer";
import { RoomHeader } from "@/components/ui/Room/RoomHeader";

const Page = () => {
  return <div className='flex flex-col justify-center items-center gap-3'>
    <RoomHeader />
    <RoomDisplayer />
  </div>
}

export default Page;
