'use client'
import { Button } from "../button";
import { ScrollArea } from "../scroll-area";
import { useState } from "react";
import { RoomSearchBar } from "../SearchBar/RoomSearchBar";
import { Spinner } from "../spinner";

export const GameList = () => {
  // Mock.
  const games = [
    {
      name: "Chess",
      host: "Nicky",
    },
    {
      name: "Chess",
      host: "Nicky",
    },
    {
      name: "Checkers",
      host: "John",
    },
    {
      name: "Go",
      host: "Jane",
    },
    {
      name: "Dots and Boxes",
      host: "John",
    },
    {
      name: "Tic Tac Toe",
      host: "Jane",
    },
  ];
  const [searchedRooms, setSearchedRooms] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div className="flex flex-col gap-2">
      <h3>List of avalaible game:</h3>
      <RoomSearchBar loading={loading} setSearchedRooms={setSearchedRooms} />
      <ScrollArea className="flex flex-col gap-3 rounded-md border p-4 h-100">
        {!loading ? (
          games.map((game, index) => {
            return (
              <li
                key={index}
                className="border-y p-3 flex gap-4 items-center justify-between"
              >
                <div>
                  <p className="text-2xl">{game.name}</p>
                  <p>{game.host}</p>
                </div>
                <Button>Join</Button>
              </li>
            );
          })
        ) : (
          <Spinner />
        )}
      </ScrollArea>
    </div>
  );
};
