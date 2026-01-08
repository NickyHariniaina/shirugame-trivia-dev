'use client'
import { YouNeedAnAccount } from "@/components/ui/chore-component/you-need-an-account";
import { Header } from "@/components/ui/header";
import { SettingBodyContent } from "@/components/ui/setting/setting-body-content";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";

const Page = () => {
  const { data: session } = authClient.useSession();
  const [logged, setLogged] = useState<boolean>(false);

  useEffect(() => {
    if (session?.user) {
      setLogged(true);
    } else {
      setLogged(false);
    }
  }, [session]);

  console.log(session?.user);

  if (!session) return <YouNeedAnAccount />

  return <div>
    <Header logged={logged} session={session}/>
    <SettingBodyContent user={session?.user} session={session}/>
  </div>
}

export default Page
