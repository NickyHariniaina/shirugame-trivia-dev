import { Github, Mail } from "lucide-react";
import { Button } from "../button";

export const OAuth = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-5 md:justify-around">
      <Button>
        <Mail /> Continue with Google
      </Button>
      <Button>
        <Github /> Continue with GitHub
      </Button>
    </div>
  );
};
