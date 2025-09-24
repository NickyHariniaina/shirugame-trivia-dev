"use client";
import Link from "next/link";
import { Button } from "../button";
import { Input } from "../input";
import { useRouter } from "next/navigation";
import { ShowPassButton } from "@/components/ui/Button/ShowPassButton";
import { Label } from "../label";
import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { useState } from "react";

const ButtonMotion = motion.create(Button);

type FormType = {
  email: string;
  password: string;
};

export const SignIn = () => {
  const { register, handleSubmit } = useForm<FormType>();

  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [showPass, setShowPass] = useState(false);
  const handleClick = async (data: FormType) => {
    const { email, password } = data;
    let loadId: string | undefined;
    await authClient.signIn.email(
      {
        email: email,
        password: password,
      },
      {
        onSuccess: () => {
          toast.success("Welcome back.", { id: loadId });
          setLoading(false);
          router.push("/");
        },
        onError: (ctx) => {
          toast.error(ctx.error.message, { id: loadId });

          setLoading(false);
        },
        onRequest: () => {
          loadId = toast.loading("Wait please...");
          setLoading(true);
        },
      },
    );
  };
  return (
    <form className="flex flex-col justify-center items-center gap-5">
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          {...register("email")}
          type="email"
          id="email"
          placeholder="user@gmail.com"
        />
      </div>
      <div className="flex md:flex-row flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Your password</Label>
          <Input
            type={showPass ? "text" : "password"}
            id="password"
            {...register("password")}
          />
        </div>
      </div>

      <div className="flex flex-col justify-center items-center">
        <ShowPassButton showPass={showPass} setShowPass={setShowPass} />
      </div>
      <ButtonMotion
        className="w-full"
        whileTap={{ scale: 0.98 }}
        onClick={handleSubmit(handleClick)}
        disabled={loading}
      >
        Sign in
      </ButtonMotion>
      <Link href="/auth/sign-up" className="text-sm  hover:underline">
        Don't have an account ?
      </Link>
    </form>
  );
};
