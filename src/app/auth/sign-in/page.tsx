import { OAuth } from "@/components/ui/Auth/OAuth";
import { SignIn } from "@/components/ui/Auth/SignIn";
import { ModeToggle } from "@/components/ui/Button/DarkModeToogle";
import { Separator } from "@/components/ui/separator";
import * as motion from "motion/react-client";

const Page = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.4,
      }}
      className="flex flex-col gap-5 p-5  hover:shadow-2xl dark:hover:shadow-blue-900 transition-all duration-200 ease-in-out rounded-3xl justify-center "
    >
      <ModeToggle />
      <SignIn />
      <Separator />
      <OAuth />
    </motion.div>
  );
};

export default Page;
