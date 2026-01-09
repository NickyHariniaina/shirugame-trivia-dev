"use client";
import FullScreenLoader from "@/components/ui/loading/fullscreen";
import { Header } from "@/components/ui/header";
import { ContactBodyContent } from "@/components/ui/contact/contact-body-content";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";

const Page = () => {
  const [logged, setLogged] = useState<boolean>(false);
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (session?.user) {
      setLogged(true);
    } else {
      setLogged(false);
    }
  }, [session]);

  if (isPending) return <FullScreenLoader />;
  return <div className="flex flex-col gap-5">
    <Header logged={logged} session={session} />
    <ContactBodyContent />
  </div>;
}

export default Page;
