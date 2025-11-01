"use client"
import { authClient } from "@/lib/auth-client"
import { Room } from "@/types/db"
import { fetchRoomById } from "@/utils/func"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { PlayerScreenForRoom } from "./PlayerScreenForRoom"

export const RoomDisplayer = () => {
  const [room, setRoom] = useState<Room>()
  const params = useParams()
  const roomId = params.roomId as string
  const {data: session} = authClient.useSession();
  const [isOwner, setIsOwner] = useState<boolean>();


  const fetchRoom = async () => {
    const fetchedRoom: Room = await fetchRoomById(roomId)
    setRoom(fetchedRoom)
  }

  useEffect(() => {
    if (session?.user.id == room?.openedBy.id) {
      setIsOwner(true);
    } else {
      setIsOwner(false);
    }
    fetchRoom()
  }, [])

  console.log(room)
  return <div className='flex flex-col gap-2'>
    {
      isOwner? <PlayerScreenForRoom room={room}/>: <PlayerScreenForRoom room={room}/>
    }
  </div>
}
