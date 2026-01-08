"use client";
import { Body } from "@/components/ui/Body";
import { Footer } from "@/components/ui/Footer";
import { Header } from "@/components/ui/Header";
import { authClient } from "@/lib/auth-client";
import { useUser } from "@/stores/useUser";
import { useState, useEffect } from "react";

const Page = () => {
  const [logged, setLogged] = useState<boolean>(false);
  const { data: session } = authClient.useSession();
  const { setUserData } = useUser();

  useEffect(() => {
    if (!session) {
      setLogged(false);
    } else {
      setLogged(true);
      setUserData(session?.user);
    }
  }, [session, setUserData]);

  return (
    <div className="flex flex-col m-2 gap-3">
      <Header logged={logged} />
      <Body logged={logged} />
      <Footer />
    </div>
  );
};

export default Page;
