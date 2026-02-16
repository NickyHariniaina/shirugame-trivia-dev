'use client'
import { YouNeedAnAccount } from "@/components/ui/chore-component/you-need-an-account";
import { Header } from "@/components/ui/header";
import { SettingBodyContent } from "@/components/ui/setting/setting-body-content";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/shadcn-component/skeleton";

const Page = () => {
  const { data: session, isPending } = authClient.useSession();
  const [logged, setLogged] = useState<boolean>(false);

  useEffect(() => {
    if (session?.user) {
      setLogged(true);
    } else {
      setLogged(false);
    }
  }, [session]);
  if (isPending) {
    return (
      <div>
        <Skeleton className="h-16 w-full mb-4" />
        <div className="flex flex-col gap-4 p-4">
          <Skeleton className="h-32 w-full max-w-md" />
          <Skeleton className="h-24 w-full max-w-md" />
        </div>
      </div>
    );
  }
  if (!session) return <YouNeedAnAccount />
  return <div>
    <Header logged={logged} session={session}/>
    <SettingBodyContent user={session?.user} session={session}/>
  </div>
}


export default Page
