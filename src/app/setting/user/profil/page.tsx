"use client"
import { generatePath } from "@/utils/func";
import { usePathname } from "next/navigation";
import { Breadpath } from "@/components/ui/Breadpath";
import { ProfilBody } from "@/components/ui/profil/ProfilBody";
import { Separator } from "@/components/ui/separator";
import { ProfilSettings } from "@/components/ui/profil/ProfilSettings";
const Page = () => {
  const path = usePathname();
  const [formattedPath, hrefPath] = generatePath(path);
  return <div>
    <Breadpath path={formattedPath} hrefPath={hrefPath} />
    <ProfilBody />
    <Separator className="my-4" />
    <ProfilSettings />
  </div>
}

export default Page
