import { Github, Mail } from "lucide-react";
import { Button } from "../button";

export const OAuth = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-5 md:justify-around">
      <Button
        className="flex items-center gap-2 
                   bg-white text-gray-800 border border-gray-300 hover:bg-gray-100
                   dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
      >
        <Mail /> Continue with Google
      </Button>
      <Button
        className="flex items-center gap-2 
                   bg-gray-900 text-white hover:bg-gray-800
                   dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
      >
        <Github /> Continue with GitHub
      </Button>
    </div>
  );
};
