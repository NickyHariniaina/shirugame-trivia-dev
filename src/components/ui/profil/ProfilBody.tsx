"use client";
import { useUser } from "@/stores/useUser";
import { Avatar } from "../Avatar";
import { authClient } from "@/lib/auth-client";
import { formatRank, generateImage, initializeRank, setUserImage } from "@/utils/func";
import { Button } from "../button";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

export const ProfilBody = () => {
  const session = authClient.useSession();
  const { userData, fetchUserData } = useUser();

  const formattedRanking = formatRank(userData?.rank || 1);
  const [loading, setLoading] = useState(false);
  const image = userData?.image || "";
  const userId = session?.data?.user?.id || "";


  useEffect(() => {
    if (userData) {
      setLoading(false);
    } else {
      setLoading(true);
      fetchUserData(userId);
    }
  }, [userData]);

  console.log(userData);


  const reloadUserData = async () => {
    if (!userData) {
      return;
    }
    if (!userData.rank) {
      await initializeRank(userId);
      toast.success("Rank initialized successfully", { id: "initialize-rank" });
    }
    fetchUserData(userId);
    toast.success("User data reloaded successfully", { id: "reload-user-data" });
  }

  const regeneratePicture = async () => {
    try {
      if (userData) {
        toast.error("You can't regenerate your picture if you have already set one", { id: "regenerate-picture" });
        return;
      }
      setLoading(true);
      const image = await generateImage(userId);
      await setUserImage(image, userId);
      fetchUserData(userId);
      setLoading(false);
      toast.success("Picture regenerated successfully, it may need to reload the page...", { id: "regenerate-picture" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <Avatar
        loading={loading}
        src={image}
        alt={session?.data?.user?.username || ""}
        size={200}
      />
      <Button variant="outline" onClick={regeneratePicture}>
        Re-generate profil pics
      </Button>
      <h2 className="text-2xl font-bold">@{session?.data?.user?.username}</h2>
      <div>
        <p className="text-sm">Rank: {formattedRanking}</p>
        <p className="text-sm">High Score: {userData?.highestScore} pts</p>
      </div>
      <Button variant="outline" onClick={reloadUserData}>Refresh or initialize</Button>
    </div>
  );
};
