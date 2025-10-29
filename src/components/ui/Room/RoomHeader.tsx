"use client"
import { ArrowLeft } from "lucide-react";
import { ModeToggle } from "../Button/DarkModeToogle";
import { Button } from "../button";
import { useRouter } from "next/navigation";
import { Separator } from "../separator";

export const RoomHeader = () => {
  const router = useRouter()
    return <div className="flex flex-col w-full">
      <div className="m-5 flex gap-3">
        <Button variant="ghost" size="icon" onClick={() => router.push("/")}><ArrowLeft /></Button>
        <ModeToggle />
      </div>
      <Separator />
    </div>
}
