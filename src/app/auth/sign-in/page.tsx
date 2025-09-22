import { SignIn } from "@/components/ui/Auth/SignIn";

const Page = () => {
  return (
    <div className="flex flex-row gap-3 p-5 border-1 dark:border-white border-black rounded justify-center items-center">
      <SignIn />
    </div>
  );
};

export default Page;
