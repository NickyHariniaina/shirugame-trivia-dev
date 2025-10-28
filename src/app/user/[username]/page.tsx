"use client"

import { useParams } from "next/navigation";

// I accidentally put username instead of id.
const Page = () => {
  const params = useParams();
  const userId = params.username;
  console.log(userId);
  return <div>

  </div>
}

export default Page
