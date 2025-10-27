import { StepBack } from "lucide-react";
import { Button } from "../button";

export const LeaderboardHeader = () => {
  return <div className="m-5 flex items-center justify-center gap-5">
    <Button variant="ghost"><StepBack /></Button>
    <h1 className="text-6xl">Shirugame</h1>
  </div>;
};
