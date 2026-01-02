"use client";
import { User } from "lucide-react";
import { Button } from "../button";
import { useRouter } from "next/navigation";

export const YouNeedAnAccount = () => {
  const router = useRouter();
  return (
    <div className="p-5 flex flex-col items-center justify-center h-full gap-6 text-center px-4">
      <User size={64} className="text-yellow-500 animate-bounce" />

      <h2 className="text-3xl md:text-5xl font-extrabold text-gray-800 dark:text-white">
        Please sign in to continue using this part of the app.
      </h2>

      <p className="text-lg md:text-xl text-gray-600 max-w-xl dark:text-white">
        <Button variant="outline" onClick={() => router.push("/auth/sign-in")}>Go to login page</Button>
      </p>
    </div>
  );
};
