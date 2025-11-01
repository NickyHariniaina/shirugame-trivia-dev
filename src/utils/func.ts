import { prisma } from "@/lib/prisma";
import { Room, User } from "@/types/db";
import { RoomDto } from "@/types/dto";
import React from "react";

export const generatePath = (path: string) => {
  const formattedPath = path.split("/").slice(1);
  let currentPath = "";
  const hrefPath = [];
  for (const content of formattedPath) {
    currentPath += "/";
    currentPath += content;
    hrefPath.push(currentPath);
  }
  return [formattedPath, hrefPath];
}

export const formatRank = (rank: number) => {
  if (rank > 5) {
    return rank + "th";
  } else {
    let stars = "";
    for (let i = 0; i < rank; i++) {
      stars += "★";
    }
    return stars;
  }
}

export const generateImage = async (userId: string) => {
  try {
    const url = "https://api.dicebear.com/9.x/fun-emoji/svg?scale=100&seed=" + userId;
    return url as string;
  } catch (error) {
    console.log(error);
  }
}

export const setUserImage = async (image: string | undefined, userId: string) => {
  try {
    const res = await fetch(`/api/users/${userId}/image`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image,
      }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}


export const initializeRank = async (userId: string) => {
  try {
    const usersRes = await fetch("/api/users");
    const users = await usersRes.json();
    console.log(users);
    const userCount = users.data.length;
    const url = `/api/users/${userId}/rank`;
    console.log(userCount);
    const res = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rank: userCount,
      }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

// TODO: A better critieria function that handle everything.
export const getUsersWithCriteria = async (criteria: string) => {
  try {
    const url = `/api/users?criteria=${criteria}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export const getQuestions = async (numberOfQuestion: number) => {
  try {
    const url = `/api/questions?numberOfQuestion=${numberOfQuestion}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data)
    return data.data;
  } catch (error) {
    console.log(error);
  }
}


export const createRoom = async (data: RoomDto) => {
  try {
    const url = `/api/rooms`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const dataRes = await res.json();
    return dataRes;
  } catch (error) {
    console.log(error);
  }
}

export const copyToClipboard = async () => {
  // TODO: complete later
}

// TODO: Search how to do generics with arrowed function
export function filterSearchRoom(initialData: Room[], queryString: string) {
  return initialData.filter((room: Room) => {
    return room.title.includes(queryString);
  })
}

export const fetchRoomById = async (userId: string) => {
  try {
    const res = await fetch("/api/rooms/" + userId);
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.log(error)
  }
}






