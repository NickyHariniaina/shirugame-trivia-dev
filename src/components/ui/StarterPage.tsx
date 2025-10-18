import { useRouter } from "next/navigation";
import { Button } from "./button";

export const StarterPage = () => {
  const router = useRouter();
  return (
    <div className="flex items-center flex-col gap-4">
      <p className="text-xl">
        Before playing with your friends, let&apos;s first configure some
        details to let people know you...
      </p>
      <Button
        className="animate-bounce"
        onClick={() => router.push("/auth/starter/profil")}
      >
        Continue
      </Button>
    </div>
  );
};
