"use client"
import { generatePath } from "@/utils/func";
import { usePathname } from "next/navigation";
import { Breadpath } from "@/components/ui/Breadpath";
const Page = () => {
  const path = usePathname();
  const [formattedPath, hrefPath] = generatePath(path);
  return <div>
    <Breadpath path={formattedPath} hrefPath={hrefPath} />
  </div>
}

export default Page
