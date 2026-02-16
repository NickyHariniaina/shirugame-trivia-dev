"use client";
import { Header } from "@/components/ui/header";
import { ContactBodyContent } from "@/components/ui/contact/contact-body-content";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/shadcn-component/skeleton";

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

  if (isPending) {
    return (
      <div className="flex flex-col gap-5">
        <Skeleton className="h-16 w-full" />
        <div className="flex flex-col gap-4 p-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    );
  }
  return <div className="flex flex-col gap-5">
    <Header logged={logged} session={session} />
    <ContactBodyContent />
  </div>;
}

export default Page;
