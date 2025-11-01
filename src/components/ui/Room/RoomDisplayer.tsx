"use client"
import { Room } from "@/types/db"
import { fetchRoomById } from "@/utils/func"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"


export const RoomDisplayer = () => {
  const [room, setRoom] = useState<Room>()
  const params = useParams()
  const roomId = params.roomId as string

  const fetchRoom = async () => {
    const fetchedRoom: Room = await fetchRoomById(roomId)
    setRoom(fetchedRoom)
  }

  useEffect(() => {
    fetchRoom()
  }, [])

  console.log(room)
  return <div className='flex flex-col gap-2'>

  </div>
}
