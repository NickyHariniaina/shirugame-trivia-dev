"use client"
import { getUsersWithCriteria, initializeRank } from "@/utils/func";
import { User } from "@/types/db";
import { useState, useEffect } from "react";
import { Button } from "../shadcn-component/button";
import { Spinner } from "../shadcn-component/spinner";
import { UserTable } from "../tables/user-table";
import { authClient } from "@/lib/auth-client";
import { Skeleton } from "../shadcn-component/skeleton";

export const LeaderboardBody = () => {
  const [users, setUsers] = useState<User[]>([]);
  const { data: session, isPending } = authClient.useSession();


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

  if (isPending) {
    return (
      <div className="flex flex-col gap-5 items-center justify-center m-4">
        <Skeleton className="h-10 w-48" />
        <div className="w-full max-w-2xl">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full mb-2" />
          ))}
        </div>
      </div>
    );
  }

  console.log(users);
  return <div className="flex flex-col gap-5 items-center justify-center m-4">
    <Button variant="secondary" onClick={handleRefresh}>Refresh leaderboard</Button>
    {users.length === 0 ? <Spinner /> : <UserTable users={users} handleRefresh={handleRefresh}/>}
  </div>;
};
