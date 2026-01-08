"use client"
import { StepBack } from "lucide-react";
import { Button } from "../shadcn-component/button";
import { useRouter } from "next/navigation";
import { ModeToggle } from "../button/dark-mode-toggle";

export const LeaderboardHeader = () => {
  const router = useRouter();
  return (
    <div className="m-4 md:m-5 flex flex-row items-center justify-center gap-3 md:gap-5">
      <Button onClick={() => router.push("/")} variant="ghost" className="p-2 md:p-3">
        <StepBack className="w-5 h-5 md:w-6 md:h-6" />
      </Button>
      <ModeToggle />
      <h1 className="text-3xl sm:text-4xl md:text-6xl text-center">
        Shirugame
      </h1>
    </div>
  );
};
