import { useForm } from "react-hook-form";
import { Input } from "../input";
import { useUser } from "@/stores/useUser";
import { Button } from "../button";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import toast from "react-hot-toast";

type ProfilSettingsPropsType = {
  userId: string | undefined;
};

type FormValues = {
  username: string;
  email: string;
};

export const ProfilSettings = () => {
  const [loading, setLoading] = useState(false);
  let loadId: string | undefined;
  const { register, handleSubmit } = useForm<FormValues>();
  const { userData } = useUser();
  const saveData = async (data: FormValues) => {
    if (data.username) {
      handleChangeUsername(data);
    }
    if (data.email) {
      handleChangeEmail(data);
    }
  };

  const handleChangeEmail = async (data: FormValues) => {
    if (data.email) {
      setLoading(true);
      loadId = toast.loading("Wait please...");

      const { error } = await authClient.changeEmail({
        newEmail: data.email,
      });

      if (error) {
        toast.error(
          error.message || "Something went wrong while changing the email",
          { id: loadId },
        );
        setLoading(false);
        return;
      }

      toast.success("Email verification sent successfully", {
        id: loadId,
      });
      setLoading(false);
    } else {
      toast.error("Email is required", { id: "email-required" });
      setLoading(false);
    }
  };

  const handleChangeUsername = async (data: FormValues) => {
    if (data.username) {
      // TODO: format it in a better way
      setLoading(true);
      loadId = toast.loading("Wait please...");
      const verifiedUsername = data.username.replace(" ", "_");
      const { error } = await authClient.updateUser({
        username: verifiedUsername,
      });
      if (error) {
        toast.error(
          error.message || "Something went wrong while updating the username",
          { id: loadId },
        );
        setLoading(false);
        return;
      }
      toast.success("Username updated successfully", {
        id: loadId,
      });
      setLoading(false);
    } else {
      toast.error("Username is required", { id: "username-required" });
      setLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-10 items-center">
      <div className="flex flex-col gap-6 justify-around items-center">
        <div className="flex flex-row gap-2 items-end">
          <div className="flex flex-col gap-2">
            <label htmlFor="username">Username</label>
            <Input
              type="text"
              {...register("username")}
              placeholder={userData?.username}
            />
          </div>
          <Button
            onClick={handleSubmit(handleChangeUsername)}
            disabled={loading}
          >
            Change
          </Button>
        </div>
        <div className="flex flex-row gap-2 items-end">
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <Input
              type="email"
              placeholder={userData?.email}
              {...register("email")}
            />
          </div>
          <Button disabled={loading} onClick={handleSubmit(handleChangeEmail)}>
            Change
          </Button>
        </div>
      </div>
      <Button onClick={handleSubmit(saveData)} disabled={loading}>
        Update
      </Button>
    </form>
  );
};
