"use client"
import { Spinner } from "../spinner"
import { Input } from "../input"
import { Button } from "../button"
import { useForm } from "react-hook-form"

type SearchRoomForm = {
  roomToSearch: string
}

type RoomSearchBarProps = {
  setSearchedRooms: React.Dispatch<React.SetStateAction<string>>
  loading: boolean
}

export const RoomSearchBar = (props: RoomSearchBarProps) => {

  const { register, handleSubmit } = useForm<SearchRoomForm>()

  const onSubmit = (data: SearchRoomForm) => {
    props.setSearchedRooms(data.roomToSearch)
  }

  return <div className="flex gap-2">
    <Input placeholder="Search for a game..." {...register("roomToSearch")} />
    <Button variant="default" onClick={handleSubmit(onSubmit)}>
      {props.loading ? <Spinner /> : "Search"}
    </Button>
  </div>
}
