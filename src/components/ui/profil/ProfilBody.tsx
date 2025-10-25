"use client"
import { useUser } from "@/stores/useUser";
import { Avatar } from "../Avatar"
import { authClient } from "@/lib/auth-client";
import { formatRank } from "@/utils/func";

// TODO: change every fetch later
// - Change the inline display to grid mode.
// - Add separator later.

export const ProfilBody = () => {


  const session = authClient.useSession();
  const {userData} = useUser();
  console.log(userData)
  const formattedRanking = formatRank(userData?.rank || 4);
  return <div className="flex flex-col gap-4 items-center">
    <Avatar src="" alt={session?.data?.user?.username || ""} size={200} />
    <h2 className="text-2xl font-bold">@{session?.data?.user?.username}</h2>
    <div>

    <p className="text-sm">Rank: {formattedRanking }</p>
      <p className="text-sm">High Score: { userData?.highestScore} pts</p>
    </div>

  </div>
}
