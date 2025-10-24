"use client"
import { generatePath } from "@/utils/func";
import { usePathname } from "next/navigation";
import { Breadpath } from "@/components/ui/Breadpath";
const Page = () => {
  const path = usePathname();
  generatePath(path)
  const formattedPath = "";
  return <div>
    <Breadpath path={formattedPath} />
  </div>
}

export default Page
