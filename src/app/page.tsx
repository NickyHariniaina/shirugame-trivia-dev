"use client";
import { Body } from "@/components/ui/Body";
import { Footer } from "@/components/ui/Footer";
import { Header } from "@/components/ui/Header";
import { authClient } from "@/lib/auth-client";
import { useState, useEffect } from "react";

const Page = () => {
  const [logged, setLogged] = useState<boolean>(false);
  const { data: session } = authClient.useSession();
  console.log(session);

  useEffect(() => {
    if (!session) {
      setLogged(false);
    } else {
      setLogged(true);
    }
  }, [session]);
  return (
    <div className="flex flex-col m-2 gap-3">
      <Header logged={logged} />
      <Body logged={logged} />
      <Footer />
    </div>
  );
};

export default Page;
