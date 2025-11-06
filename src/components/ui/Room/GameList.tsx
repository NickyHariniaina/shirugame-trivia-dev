"use client";
import { Button } from "../button";
import { RoomsNotFoundMessage } from "../NotFound/RoomsNotFoundMessage";
import { ScrollArea } from "../scroll-area";
import { useEffect, useState } from "react";
import { RoomSearchBar } from "../SearchBar/RoomSearchBar";
import { Spinner } from "../spinner";
import { Room } from "@/types/db";
import { Link2 } from "lucide-react";
import toast from "react-hot-toast";
import { filterSearchRoom } from "@/utils/func";
import { useRouter } from "next/navigation";

export const GameList = () => {
  const router = useRouter();
  const handleCopyLink = async () => {
    try {
      // TODO: Create the copy to clipboard function later
      toast.success("Link copied to clipboard successfully.", { id: "copyId" });
    } catch (error) {
      console.log(error);
      toast.error("Error while copying the link, try again later...", {
        id: "errorCopyId",
      });
    }
  };
  const [rooms, setRooms] = useState<Room[]>([]);

  const [searchedRooms, setSearchedRooms] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const fetchRooms = async () => {
    setLoading(true);
    const response = await fetch("/api/rooms");
    const data = await response.json();
    let filteredData: Room[];
    if (searchedRooms === "") {
      filteredData = data.data;
    } else {
      filteredData = filterSearchRoom(data.data, searchedRooms);
    }

    setRooms(filteredData);
    setLoading(false);
  };

  useEffect(() => {
    fetchRooms();
  }, [searchedRooms]);

  return (
    <div className="px-4 flex flex-col gap-2">
      <RoomSearchBar loading={loading} setSearchedRooms={setSearchedRooms} />
      <h3>List of avalaible room:</h3>
      <ScrollArea className="flex flex-col gap-3 rounded-md border p-4 h-100">
        {!loading ? (
          rooms.length === 0 ? (
            <RoomsNotFoundMessage />
          ) : (
            rooms.map((room, index) => {
              return (
                <li
                  key={index}
                  className="border-y p-3 flex gap-4 items-center justify-between"
                  onClick={() => {
                    router.push(`/room/${room.id}`);
                  }}
                >
                  <div>
                    <p className="text-2xl">{room.title}</p>
                    <p>{room.openedBy.email}</p>
                  </div>
                  <Button>Join</Button>
                  <Button onClick={handleCopyLink} variant="secondary">
                    <Link2 />
                  </Button>
                </li>
              );
            })
          )
        ) : (
          <Spinner />
        )}
      </ScrollArea>
    </div>
  );
};
