import { LeaderboardBody } from "@/components/ui/Leaderboard/LeaderboardBody";
import { LeaderboardHeader } from "@/components/ui/Leaderboard/LeaderboardHeader";
const Page = () => {
  return <div className="flex flex-col gap-5">
    <LeaderboardHeader />
    <LeaderboardBody />
  </div>;
};

export default Page;
