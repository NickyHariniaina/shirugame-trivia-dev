import { OAuth } from "@/components/ui/Auth/OAuth";
import { SignUp } from "@/components/ui/Auth/SignUp";
import { ModeToggle } from "@/components/ui/Button/DarkModeToogle";
import { Separator } from "@/components/ui/separator";
import * as motion from "motion/react-client";

const Page = () => {
  return (
    <motion.div
      className="flex flex-col gap-5 p-5  hover:shadow-2xl dark:hover:shadow-blue-900 transition-all duration-200 ease-in-out rounded-3xl justify-center "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.4,
      }}
    >
      <ModeToggle />
      <SignUp />
      <Separator />
      <OAuth />
    </motion.div>
  );
};

export default Page;
