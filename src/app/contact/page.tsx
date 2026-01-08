"use client";
import { Header } from "@/components/ui/header";
import { ContactBodyContent } from "@/components/ui/contact/contact-body-content";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";

const Page = () => {
  const [logged, setLogged] = useState<boolean>(false);
  const { data: session } = authClient.useSession();

  useEffect(() => {
    if (session?.user) {
      setLogged(true);
    } else {
      setLogged(false);
    }
  }, [session]);
  return <div className="flex flex-col gap-5">
    <Header logged={logged}/>
    <ContactBodyContent />
  </div>;
}

export default Page;
