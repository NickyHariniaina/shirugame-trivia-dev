"use client"
import { authClient } from "@/lib/auth-client"
import { Room } from "@/types/db"
import { fetchRoomById } from "@/utils/func"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { PlayerScreenForRoom } from "./PlayerScreenForRoom"
import { OwnerScreenForRoom } from "./OwnerScreenForRoom"
import { useUser } from "@/stores/useUser"

export const RoomDisplayer = () => {
  const [room, setRoom] = useState<Room>()
  const params = useParams()
  const roomId = params.roomId as string
  const {data: session} = authClient.useSession();
  const [isOwner, setIsOwner] = useState<boolean>();
  const { userData } = useUser();

  const fetchRoom = async () => {
    const fetchedRoom: Room = await fetchRoomById(roomId)
    setRoom(fetchedRoom)
  }

  console.log(userData?.id)
  console.log(room?.openedBy.id)
  useEffect(() => {
    if (userData?.id == room?.openedBy.id) {
      console.log("isOwner")
      setIsOwner(true);
    } else {
      setIsOwner(false);
    }
    fetchRoom()
  }, [])

  return <div className='flex flex-col gap-2'>
    {
      isOwner? <OwnerScreenForRoom room={room}/>: <PlayerScreenForRoom room={room}/>
    }
  </div>
}
