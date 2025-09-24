"use client";
import Link from "next/link";
import { Button } from "../button";
import { Input } from "../input";
import { Label } from "../label";
import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import { authClient } from "@/lib/auth-client";

const ButtonMotion = motion.create(Button);

type FormType = {
  email: string;
  password: string;
};

export const SignIn = () => {
  const { register, handleSubmit } = useForm<FormType>();

  const handleClick = async (data: FormType) => {
    const { email, password } = data;

    const { error } = await authClient.signIn.email(
      {
        email: email,
        password: password,
      },
      {
        onSuccess: () => {
          console.log("Logged in");
        },
        onError: (ctx) => {
          console.log(ctx.error.message);
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
          <Input type="password" id="password" {...register("password")} />
        </div>
      </div>
      <ButtonMotion
        className="w-full"
        whileTap={{ scale: 0.98 }}
        onClick={handleSubmit(handleClick)}
      >
        Sign in
      </ButtonMotion>
      <Link href="/auth/sign-up" className="text-sm  hover:underline">
        Don't have an account ?
      </Link>
    </form>
  );
};
