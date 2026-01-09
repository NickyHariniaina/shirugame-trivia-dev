"use client";
import { Button } from "../shadcn-component/button";
import { ScrollArea } from "../shadcn-component/scroll-area";
import { useEffect, useState } from "react";
import { RoomSearchBar } from "../search-bar/room-search-ar";
import { Spinner } from "../shadcn-component/spinner";
import { Room } from "@/types/db";
import { filterSearchRoom } from "@/utils/func";
import { useRouter } from "next/navigation";

export const GameList = () => {
  const router = useRouter();

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
    <div className="px-4 py-4 flex flex-col gap-4">
      {/* Search bar */}
      <RoomSearchBar loading={loading} setSearchedRooms={setSearchedRooms} />
      <h3 className="text-lg md:text-xl font-semibold">
        List of available rooms:
      </h3>

      {/* Scrollable room list */}
      <ScrollArea className="flex flex-col gap-3 rounded-md border p-4 h-[60vh] md:h-[70vh] overflow-auto">
        {!loading ? (
          rooms.length === 0 ? (
            <div className="flex flex-col items-center justify-center">
              <p>No rooms yet... come back later</p>
            </div>
          ) : (
            rooms.map((room, index) => (
              <li
                key={room.id}
                className="border-b p-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 hover:cursor-pointer"
                onClick={() => router.push(`/room/${room.id}`)}
                >
                {/* Room info */}
                <div
                  className="flex flex-col sm:flex-row sm:items-center sm:gap-4 w-full sm:w-auto"
                  onClick={() => router.push(`/room/${room.id}`)}
                >
                  <p className="text-xl md:text-2xl font-medium">
                    {room.title}
                  </p>
                  <p className="text-sm md:text-base text-gray-500">
                    {room.openedBy.email}
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex gap-2 flex-wrap sm:flex-nowrap mt-2 sm:mt-0">
                  <Button onClick={() => router.push(`/room/${room.id}`)}>
                    Join
                  </Button>
                </div>
              </li>
            ))
          )
        ) : (
          <div className="flex justify-center py-8">
            <Spinner />
          </div>
        )}
      </ScrollArea>
    </div>
  );
};
