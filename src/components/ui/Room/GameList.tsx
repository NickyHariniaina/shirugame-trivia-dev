"use client";
import { Button } from "../button";
import { RoomsNotFoundMessage } from "../NotFound/RoomsNotFoundMessage";
import { ScrollArea } from "../scroll-area";
import { useEffect, useState } from "react";
import { RoomSearchBar } from "../SearchBar/RoomSearchBar";
import { Spinner } from "../spinner";
import { Room } from "@/types/db";

export const GameList = () => {
  const [rooms, setRooms] = useState<Room[]>([]);

  const [searchedRooms, setSearchedRooms] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const fetchRooms = async () => {
    setLoading(true);
    const response = await fetch("/api/rooms");
    const data = await response.json();
    setRooms(data.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <h3>List of avalaible room:</h3>
      <RoomSearchBar loading={loading} setSearchedRooms={setSearchedRooms} />
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
                >
                  <div>
                    <p className="text-2xl">{room.title}</p>
                    <p>{room.openedBy.email}</p>
                  </div>
                  <Button>Join</Button>
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
