"use client"
import { useRouter } from "next/navigation";
import { Button } from "./shadcn-component/button";
import { ArrowBigRightDash } from "lucide-react";

export const StarterPage = () => {
  const router = useRouter();
  return (
    <div className="flex items-center flex-col gap-4">
      <p className="text-lg text-center">
        Before playing with your friends, let&apos;s first configure some
        details to let people know you...
      </p>
      <Button
        className="animate-bounce"
        onClick={() => router.push("/auth/starter/profil")}
      >
        <ArrowBigRightDash />
      </Button>
    </div>
  );
};
