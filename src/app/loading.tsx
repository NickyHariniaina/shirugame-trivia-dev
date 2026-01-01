import { Spinner } from "@/components/ui/spinner";

const Page = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full gap-4">
      <Spinner />
      <p>
        please wait...
      </p>
    </div>
  );
};

export default Page;
