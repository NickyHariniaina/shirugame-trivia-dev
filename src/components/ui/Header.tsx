"use client";

import { Avatar } from "./Avatar";
import { Badge } from "./badge";
import { Button } from "./button";
import { ModeToggle } from "./Button/DarkModeToogle";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { BadgeCheckIcon, Menu } from "lucide-react";

type HeaderPropsType = {
  logged: boolean | undefined;
};

export const Header = (props: HeaderPropsType) => {
  return (
    <div className="flex flex-row justify-between items-center md:m-4 rounded-3xl hover:shadow-2xl dark:hover:shadow-blue-900 transition-all duration-200 ease-in-out">
      <div className="m-5 sm:flex hidden">
        <ModeToggle />
      </div>

      {/* Desktop menu */}
      <ul className="hidden sm:flex flex-row items-center gap-3 p-1">
        <Button variant="ghost">Rooms</Button>
        <Button variant="ghost">Ranks</Button>
        <Button variant="ghost">Settings</Button>
        <Button variant="ghost">Contact</Button>
      </ul>

      {/* Mobile hamburger */}
      <div className="sm:hidden flex flex-row items-center m-3">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Shirugame</SheetTitle>
              <SheetDescription>v0.0.1</SheetDescription>
            </SheetHeader>
            <ul className="flex flex-col gap-4 mt-8">
              <Button variant="ghost">Rooms</Button>
              <Button variant="ghost">Ranks</Button>
              <Button variant="ghost">Settings</Button>
              <Button variant="ghost">Contact</Button>
            </ul>
            <SheetFooter className="flex flex-row justify-end">
              <div className="m-5 ">
                <ModeToggle />
              </div>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      {props.logged ? (
        <div className="flex flex-row items-center gap-2">
          <Avatar src="" alt="N" size={40} />
        </div>
      ) : (
        <div className="flex flex-row items-center gap-2 p-4">
          <Button variant="default" type="button">
            Log in
          </Button>
          <Button variant="default" type="button">
            Sign up
          </Button>
        </div>
      )}
    </div>
  );
};
