"use client";
import { Button } from "../button";
import { authClient } from "@/lib/auth-client";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import toast from "react-hot-toast";
import { useUser } from "@/stores/useUser";
import { Spinner } from "../spinner";

export const OAuth = () => {
  const setLoading = useUser((state) => state.setLoading);
  const loading = useUser((state) => state.loading);
  const handleGoogleSign = async () => {
    console.log(loading)
    const data = await authClient.signIn.social({
      provider: "google",
    });
    if (data) {
      toast.success("Redirecting to Google...");
    }
    setLoading(false);
  };

  const handleGithubSign = async () => {
    setLoading(true);
    const data = await authClient.signIn.social({
      provider: "github",
    });
    if (data) {
      toast.success("Redirecting to GitHub...");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-5 md:justify-around">
      <Button
        className="flex items-center gap-2
                   bg-white text-gray-800 border border-gray-300 hover:bg-gray-100
                   dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
        onClick={handleGoogleSign}
      >
        { loading ? ( <Spinner /> ) : ( <FcGoogle /> )} Continue with Google
      </Button>
      <Button
        className="flex items-center gap-2
                   bg-gray-900 text-white hover:bg-gray-800
                   dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
        onClick={handleGithubSign}
      >
        <FaGithub /> Continue with GitHub
      </Button>
    </div>
  );
};
