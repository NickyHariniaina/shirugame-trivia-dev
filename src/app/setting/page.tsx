'use client'
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

  return <div>
    <Header logged={logged}/>
    <SettingBodyContent user={session?.user}/>
  </div>
}

export default Page
