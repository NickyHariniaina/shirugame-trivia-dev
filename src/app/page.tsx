"use client";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";

export default function Home() {
  const handleLogin = async () => {
    const data = await authClient.signIn.social({
      provider: "github",
    });
    console.log(data);
  };

  const handleSignout = async () => {
    const data = await authClient.signOut();
  };
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <button onClick={handleLogin}>click here</button>
      <button onClick={handleSignout}>sign out</button>
    </div>
  );
}
