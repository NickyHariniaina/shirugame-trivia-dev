import { OAuth } from "@/components/ui/auth/oauth";
import { SignIn } from "@/components/ui/auth/sign-in";
import { ModeToggle } from "@/components/ui/button/dark-mode-toggle";
import { Separator } from "@/components/ui/shadcn-component/separator";
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
