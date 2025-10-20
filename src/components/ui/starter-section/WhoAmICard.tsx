"use client";

import { Spinner } from "../spinner";
import { useForm, SubmitHandler } from "react-hook-form";
import { Label } from "@radix-ui/react-label";
import { Input } from "../input";
import { Button } from "../button";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-hot-toast";
import { useState } from "react";

type WhoAmICardProps = {
  userId: string | undefined;
};

type FormValues = {
  username: string;
};

export const WhoAmICard = (props: WhoAmICardProps) => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>();
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<FormValues> = async ({ username }) => {
    setLoading(true);
    try {
      const { data: response } = await authClient.isUsernameAvailable({ username });
      if (response?.available) {
        await authClient.updateUser({ username });
        router.push("/auth/starter/first-room");
      } else {
        toast.error("Username already taken", { id: "username-taken" });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Label htmlFor="username">How should people call you?</Label>
      <Input
        type="text"
        {...register("username", { required: "Username is required" })}
      />
      {errors.username && <p className="text-red-500">{errors.username.message}</p>}

      <Button type="submit" disabled={isSubmitting || loading}>
        {loading ? <Spinner /> : "Continue"}
      </Button>
    </form>
  );
};
