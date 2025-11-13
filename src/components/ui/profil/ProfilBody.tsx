"use client";
import { useUser } from "@/stores/useUser";
import { Avatar } from "../Avatar";
import { authClient } from "@/lib/auth-client";
import { formatRank, generateImage, initializeRank, setUserImage } from "@/utils/func";
import { Button } from "../button";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export const ProfilBody = () => {
  const {data: session} = authClient.useSession();
  const { userData, setUserData } = useUser();
  const router = useRouter();

  const formattedRanking = formatRank(userData?.rank || 1);
  const [loading, setLoading] = useState(false);

  if (!session) {
    router.push("/auth/sign-in");
  }

  const image = userData?.image || "";
  const userId = session?.user?.id || "";



  useEffect(() => {
    if (userData) {
      setLoading(false);
    } else {
      setLoading(true);
      setUserData(session?.user);
    }
  }, [userData]);

  console.log(userData);


  const reloadUserData = async () => {
    if (!userData) {
      return;
    }
    const { data: session } = authClient.useSession();
    setUserData(session?.user);
    toast.success("User data reloaded successfully", { id: "reload-user-data" });
    if (!userData.rank) {
      await initializeRank(userId);
      toast.success("Rank initialized successfully", { id: "initialize-rank" });
    }
  }

  const regeneratePicture = async () => {
    try {
      if (userData?.image) {
        toast.error("You can't regenerate your picture if you have already set one", { id: "regenerate-picture" });
        return;
      }
      setLoading(true);
      const image = await generateImage(userId);
      await setUserImage(image, userId);
      const {data: session} = authClient.useSession();
      setUserData(session?.user);
      setLoading(false);
      toast.success("Picture regenerated successfully, it may need to reload the page...", { id: "regenerate-picture" });
    } catch (error) {
      console.log(error);
    }
  };

  // const verifyEmail = async () => {
  //   try {
  //     await authClient.sendVerificationEmail({
  //       email: userData?.email || "",
  //       callbackURL: "/"
  //     })
  //     toast.success("Email sent successfully", { id: "email-sent" });
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Something went wrong while sending the email verification, please try again later", { id: "send-email-verification" });
  //   }
  //
  // }

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
      <Button variant="default" onClick={reloadUserData}>Refresh or initialize</Button>
    </div>
  );
};
