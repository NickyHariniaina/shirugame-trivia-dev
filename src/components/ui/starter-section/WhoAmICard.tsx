"use client"
import { Label } from "@radix-ui/react-label";
import { Input } from "../input";
import { Button } from "../button";
import { useUser } from "@/stores/useUser";
import { useRouter } from "next/router";
import { useState } from "react";

type WhoAmICardProps = {
  userId: string | undefined;
}

export const WhoAmICard = (props: WhoAmICardProps) => {
  const router = useRouter()
  const {setUserData, userData} = useUser()
  const [newUsername, setNewUsername] = useState<string>("");
  const handleClick = async ()  => {
    try {
      setUserData(props.userId, { username: newUsername })
      router.push("/auth/starter/first-room")
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <form className="flex flex-col gap-4">
      <Label htmlFor="username">How should people call you ?</Label>
      <Input type="text" value={newUsername} onChange={(e) => setNewUsername(e.target.value)}/>
      <Button type="button" onClick={handleClick}>Continue</Button>
    </form>
  );
};
