"use client";

import { YouNeedAnAccount } from "@/components/ui/chore-component/you-need-an-account";
import { WhoAmICard } from "@/components/ui/starter-section/who-i-am-card";
import { authClient } from "@/lib/auth-client";
import { useLogged } from "@/stores/useLogged";
import { useRouter } from "next/navigation";

const Page = () => {

  const {isLogged, setIsLogged} = useLogged();

  const session = authClient.useSession();

  if (!session) {
    setIsLogged(false);
  } else {
    setIsLogged(true);
  }

  if (!isLogged)
    return <YouNeedAnAccount />;

  return <div className="flex flex-col items-center gap-5">
    <h2 className="text-3xl">whoami</h2>
    <WhoAmICard userId={session?.data?.user?.id} />
  </div>
}

export default Page;
