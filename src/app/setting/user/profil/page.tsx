"use client"
import { generatePath } from "@/utils/func";
import { usePathname, useRouter } from "next/navigation";
import { Breadpath } from "@/components/ui/Breadpath";
import { ProfilBody } from "@/components/ui/profil/ProfilBody";
import { Separator } from "@/components/ui/separator";
import { ProfilSettings } from "@/components/ui/profil/ProfilSettings";
import { authClient } from "@/lib/auth-client";
import { useUser } from "@/stores/useUser";
import { useEffect } from "react";
const Page = () => {
  const path = usePathname();
  const [formattedPath, hrefPath] = generatePath(path);
  const { setUserData } = useUser();
  const router = useRouter();
  const { data: session } = authClient.useSession();

  // useEffect(() => {
  //   if (!session) {
  //     router.push("/auth/sign-in");
  //   } else {
  //     setUserData(session.user);
  //   }
  // }, [session, router, setUserData]);

  useEffect(() => {
    setUserData(session?.user)
  }, [])

  return <div>
    <Breadpath path={formattedPath} hrefPath={hrefPath} />
  </div>
}

export default Page
