"use client";
import { useUser } from "@/stores/useUser";
import { Avatar } from "./avatar";
import { authClient } from "@/lib/auth-client";
import {
  formatRank,
  generateImage,
  initializeRank,
  setUserImage,
} from "@/utils/func";
import { Button } from "../shadcn-component/button";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useReloadUserData } from "@/hooks/useReloadUserData";
import { YouNeedAnAccount } from "../chore-component/you-need-an-account";
import { useLogged } from "@/stores/useLogged";
import { Session } from "@/types/better-auth";

type ProfilBodyProps = {
  session: Session;
};
export const ProfilBody = (props: ProfilBodyProps) => {
  const session = props.session;
  const { userData, setUserData } = useUser();
  const router = useRouter();
  const { isLogged, setIsLogged } = useLogged();
  const formattedRanking = formatRank(userData?.rank || 1);
  const [loading, setLoading] = useState(false);
  const { reloadUserData } = useReloadUserData();
  useEffect(() => {
    if (session?.user == null) {
      setIsLogged(false);
    } else {
      setIsLogged(true);
    }
  }, [router, session, setIsLogged]);

  const image = userData?.image || "";
  const userId = session?.user?.id || "";
  useEffect(() => {
    if (userData) {
      setLoading(false);
    } else {
      setLoading(true);
      if (session?.user) {
        setUserData(session?.user);
      }
    }
  }, [userData, session]);

  if (!isLogged) return <YouNeedAnAccount />;

  const regeneratePicture = async () => {
    try {
      if (userData?.image) {
        toast.error(
          "You can't regenerate your picture if you have already set one",
          { id: "regenerate-picture" }
        );
        return;
      }
      setLoading(true);
      const image = await generateImage(userId);
      await setUserImage(image, userId);
      const { data: session } = authClient.useSession();
      setUserData(session?.user);
      setLoading(false);
      toast.success(
        "Picture regenerated successfully, it may need to reload the page...",
        { id: "regenerate-picture" }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <Avatar
        loading={loading}
        src={image}
        alt={session?.user?.username || ""}
        size={200}
      />
      <Button variant="outline" onClick={regeneratePicture}>
        Re-generate profil pics
      </Button>
      <div className="flex flex-row gap-2 items-center">
        <h2 className="text-2xl font-bold">@{session?.user?.username}</h2>
      </div>
      <div>
        <p className="text-sm">Rank: {formattedRanking}</p>
        <p className="text-sm">Score: {userData?.highestScore} pts</p>
      </div>
      <Button variant="default" onClick={reloadUserData}>
        Refresh or initialize
      </Button>
    </div>
  );
};
