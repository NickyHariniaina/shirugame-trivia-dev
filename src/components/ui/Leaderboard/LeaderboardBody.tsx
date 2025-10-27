"use client"
import { getUsersWithCriteria } from "@/utils/func";
import { User } from "@/types/db";
import { useState, useEffect } from "react";
import { Spinner } from "../spinner";
import { UserTable } from "../Tables/UserTable";

export const LeaderboardBody = () => {
  const [users, setUsers] = useState<User[]>([]);


  useEffect(() => {
    const fetchUsersRanked = async () => {
      const users = await getUsersWithCriteria("rank");
      setUsers(users.data);
    };
    fetchUsersRanked();
  }, []);

  console.log(users);
  return <div className="flex flex-col gap-5 items-center justify-center m-4">
    {users.length === 0 ? <Spinner /> : <UserTable users={users} />}
  </div>;
};
