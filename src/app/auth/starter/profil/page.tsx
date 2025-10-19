"use client";

import { WhoAmICard } from "@/components/ui/starter-section/WhoAmICard";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/router";

const Page = () => {
  const router = useRouter();

  const session = authClient.useSession();

  if (!session) {
    router.push("/auth/sign-in");
  }

  return <div className="flex flex-col items-center gap-5">
    <h2 className="text-3xl">whoami</h2>
    <WhoAmICard userId={session?.data?.user?.id} />
  </div>
}

export default Page;
