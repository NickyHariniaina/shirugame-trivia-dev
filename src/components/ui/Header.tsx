"use client";

import { Avatar } from "./Avatar";
import { Badge } from "./badge";
import { Button } from "./button";
import { ModeToggle } from "./Button/DarkModeToogle";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { BadgeCheckIcon, Menu } from "lucide-react";

type HeaderPropsType = {
  logged: boolean;
};

export const Header = (props: HeaderPropsType) => {
  const verified = true;
  return (
    <div className="flex flex-row justify-between items-center m-4 rounded-3xl hover:shadow-2xl dark:hover:shadow-blue-900 transition-all duration-200 ease-in-out">
      <div className="m-5 sm:flex hidden">
        <ModeToggle />
      </div>

      {/* Desktop menu */}
      <ul className="hidden sm:flex flex-row items-center gap-3 p-1">
        <Button variant="ghost">Rooms</Button>
        <Button variant="ghost">Ranks</Button>
        <Button variant="ghost">Settings</Button>
      </ul>

      {/* Mobile hamburger */}
      <div className="sm:hidden flex flex-row items-center">
        <div className="m-5">
          <ModeToggle />
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Shirugame</SheetTitle>
              <SheetDescription>v0.0.1 </SheetDescription>
              <ul className="flex flex-col gap-4 mt-8">
                <Button variant="ghost">Rooms</Button>
                <Button variant="ghost">Ranks</Button>
                <Button variant="ghost">Settings</Button>
              </ul>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex flex-row items-center gap-2">
        {verified ? (
          <Badge
            variant="secondary"
            className="bg-blue-500 text-white dark:bg-blue-600"
          >
            <BadgeCheckIcon />
            Verified
          </Badge>
        ) : null}
        <Avatar src="" alt="N" size={40} />
      </div>
    </div>
  );
};
