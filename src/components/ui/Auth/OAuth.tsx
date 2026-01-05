"use client";
import { Button } from "../button";
import { authClient } from "@/lib/auth-client";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import toast from "react-hot-toast";
import { useUser } from "@/stores/useUser";
import { useState } from "react";
import { Spinner } from "../spinner";

export const OAuth = () => {
  const [googleLoading, setGoogleLoading] = useState(false);
  const [githubLoading, setGithubLoading] = useState(false);
  const setLoading = useUser((state) => state.setLoading);
  const handleGoogleSign = async () => {
    setGoogleLoading(true)
    const data = await authClient.signIn.social({
      provider: "google",
    });
    if (data) {
      toast.success("Redirecting to Google...");
    }
    setGoogleLoading(false)
  };

  const handleGithubSign = async () => {
    setGithubLoading(true)
    const data = await authClient.signIn.social({
      provider: "github",
    });
    if (data) {
      toast.success("Redirecting to GitHub...");
    }
    setGithubLoading(false)
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-5 md:justify-around">
      <Button
        className="flex items-center gap-2
                   bg-white text-gray-800 border border-gray-300 hover:bg-gray-100
                   dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
        onClick={handleGoogleSign}
      >
        { googleLoading ? ( <Spinner /> ) : ( <FcGoogle /> )} Continue with Google
      </Button>
      <Button
        className="flex items-center gap-2
                   bg-gray-900 text-white hover:bg-gray-800
                   dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
        onClick={handleGithubSign}
      >
        { githubLoading ? ( <Spinner /> ) : ( <FaGithub /> )} Continue with GitHub
      </Button>
    </div>
  );
};
