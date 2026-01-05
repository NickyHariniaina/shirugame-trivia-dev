import { Spinner } from "@/components/ui/spinner";

const Page = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black dark:bg-white bg-opacity-50 z-50">
      <div className="flex flex-row justify-center items-center gap-4">
        <Spinner />
        <p>
          please wait...
        </p>
      </div>
    </div>
  );
};

export default Page;
