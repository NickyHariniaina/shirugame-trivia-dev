import { Room } from "@/types/db"

type PlayerScreenForRoomProps = {
  room: Room | undefined
}

export const PlayerScreenForRoom = (props: PlayerScreenForRoomProps) => {
  return <div className='flex flex-col gap-3 p-3 m-3'>
    <h2>About that room...</h2>
    <div className="flex gap-3"></div>
  </div>
}
