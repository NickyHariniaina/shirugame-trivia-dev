import { useForm } from "react-hook-form";
import { Input } from "../input";
import { useUser } from "@/stores/useUser";
import { Button } from "../button";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

type ProfilSettingsPropsType = {
  userId: string | undefined;
};

type FormValues = {
  username: string;
  email: string;
};

export const ProfilSettings = () => {
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
      await authClient.changeEmail({
        newEmail: data.email,
      });
      toast.success("Email verification sent successfully", {
        id: "email-sent",
      });
    } else {
      toast.error("Email is required", { id: "email-required" });
    }
  };

  const handleChangeUsername = async (data: FormValues) => {
    if (data.username) {
      await authClient.updateUser({ username: data.username });
      toast.success("Username updated successfully", {
        id: "username-updated",
      });
    } else {
      toast.error("Username is required", { id: "username-required" });
    }
  };

  return (
    <form className="flex flex-col gap-10 items-center">
      <div className="flex flex-col gap-6 justify-around items-center">
        <div className="flex flex-row gap-2 items-end">
          <div className="flex flex-col gap-2">
            <label htmlFor="username">Username</label>
            <Input type="text" {...register("username")} placeholder={userData?.username} />
          </div>
          <Button onClick={handleSubmit(handleChangeUsername)}>
            Change
          </Button>
        </div>
        <div className="flex flex-row gap-2 items-end">
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <Input type="email" placeholder={userData?.email} {...register("email")} />
          </div>
          <Button onClick={handleSubmit(handleChangeEmail)}>
            Change
          </Button>
        </div>
      </div>
      <Button onClick={handleSubmit(saveData)}>Update</Button>
    </form>
  );
};
