"use client"
import { usePathname } from "next/navigation";
import { Breadpath } from "@/components/ui/Breadpath";
const Page = () => {
  const path = usePathname();
  const formattedPath = path.split("/").slice(1);

  return <div>
    <Breadpath path={formattedPath} />
  </div>
}

export default Page
