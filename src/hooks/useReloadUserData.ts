import { authClient } from "@/lib/auth-client";
import { useUser } from "@/stores/useUser";
import { toast } from "react-hot-toast";
import { initializeRank } from "@/utils/func";

export const useReloadUserData = () => {
  const { data: session } = authClient.useSession();
  const { userData, setUserData } = useUser();

  const reloadUserData = async () => {
    if (!session?.user || !userData) return;

    setUserData(session.user);
    toast.success("User data reloaded successfully", { id: "reload-user-data" });

    if (!userData.rank) {
      await initializeRank(session.user.id);
      toast.success("Rank initialized successfully", { id: "initialize-rank" });
    }
  };

  return { reloadUserData, session, userData };
};
