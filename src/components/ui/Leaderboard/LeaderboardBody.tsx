"use client"
import { getUsersWithCriteria, initializeRank } from "@/utils/func";
import { User } from "@/types/db";
import { useState, useEffect } from "react";
import { Button } from "../button";
import { Spinner } from "../spinner";
import { UserTable } from "../Tables/UserTable";
import { authClient } from "@/lib/auth-client";

export const LeaderboardBody = () => {
  const [users, setUsers] = useState<User[]>([]);
  const { data: session } = authClient.useSession();


  useEffect(() => {
    const fetchUsersRanked = async () => {
      const users = await getUsersWithCriteria("rank");
      setUsers(users.data);
    };
    fetchUsersRanked();
  }, []);

  const handleRefresh = async () => {
    await initializeRank(session?.user?.id || "");
    const users = await getUsersWithCriteria("rank");
    setUsers(users.data);
  }

  console.log(users);
  return <div className="flex flex-col gap-5 items-center justify-center m-4">
    <Button variant="secondary" onClick={handleRefresh}>Refresh leaderboard</Button>
    {users.length === 0 ? <Spinner /> : <UserTable users={users} handleRefresh={handleRefresh}/>}
  </div>;
};
