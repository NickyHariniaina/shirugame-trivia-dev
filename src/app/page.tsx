"use client";
import FullScreenLoader from "@/components/ui/loading/fullscreen";
import { Body } from "@/components/ui/body";
import { Footer } from "@/components/ui/footer";
import { Header } from "@/components/ui/header";
import { authClient } from "@/lib/auth-client";
import { useUser } from "@/stores/useUser";
import { useState, useEffect } from "react";

const Page = () => {
  const [logged, setLogged] = useState<boolean>(false);
  const { data: session, isPending } = authClient.useSession();
  const { setUserData } = useUser();

  useEffect(() => {
    if (!session) {
      setLogged(false);
    } else {
      setLogged(true);
      setUserData(session?.user);
    }
  }, [session, setUserData]);

  if (isPending) return <FullScreenLoader />;

  return (
    <div className="flex flex-col m-2 gap-3">
      <Header logged={logged} session={session}/>
      <Body logged={logged} />
      <Footer />
    </div>
  );
};

export default Page;
