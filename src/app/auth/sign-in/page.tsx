import { OAuth } from "@/components/ui/Auth/OAuth";
import { SignIn } from "@/components/ui/Auth/SignIn";
import { ModeToggle } from "@/components/ui/Button/DarkModeToogle";

const Page = () => {
  return (
    <div className="flex flex-col gap-5 p-5  hover:shadow-2xl dark:hover:shadow-blue-900 transition-all duration-200 ease-in-out rounded-3xl justify-center ">
      <ModeToggle />
      <SignIn />
      <OAuth />
    </div>
  );
};

export default Page;
