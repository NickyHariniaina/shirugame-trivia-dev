"use client";
import { Body } from "@/components/ui/Body";
import { Footer } from "@/components/ui/Footer";
import { Header } from "@/components/ui/Header";
import { authClient } from "@/lib/auth-client";

const Page = () => {
  const { data: session } = authClient.useSession();
  console.log(session);
  return (
    <div className="flex flex-col m-2 gap-3">
      <Header logged={false} />
      <Body logged={false} />
      <Footer />
    </div>
  );
};

export default Page;
