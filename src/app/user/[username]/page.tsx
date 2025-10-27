import { useParams } from "next/navigation";
const Page = () => {
  const params = useParams();
  const username = params.username;
  return <div>User</div>
}

export default Page
