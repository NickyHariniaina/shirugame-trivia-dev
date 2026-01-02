'use client'
import { Header } from "@/components/ui/Header";
import { SettingBodyContent } from "@/components/ui/setting/SettingBodyContent";
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

  return <div>
    <Header logged={logged}/>
    <SettingBodyContent />
  </div>
}

export default Page
