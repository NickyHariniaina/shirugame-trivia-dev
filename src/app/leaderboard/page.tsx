import { LeaderboardBody } from "@/components/ui/leaderboard/leaderboard-body";
import { LeaderboardHeader } from "@/components/ui/leaderboard/leaderboard-header";
const Page = () => {
  return <div className="flex flex-col gap-5">
    <LeaderboardHeader />
    <LeaderboardBody />
  </div>;
};

export default Page;
