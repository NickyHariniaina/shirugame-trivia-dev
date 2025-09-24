"use client";
import Link from "next/link";
import { Button } from "../button";
import { Input } from "../input";
import { Label } from "../label";
import PasswordStrengthBar from "react-password-strength-bar";
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

export const SignUp = () => {
  const { register, handleSubmit } = useForm<FormType>();
  const [cpass, setCPass] = useState<string>("");
  const [ loading, setLoading] = useState<boolean>();
  const [score, setScore] = useState(0);
  const handleClick = async (data: FormType) => {
    if (score < 2) {
      toast.error("Your password is not strong enough...")
      return 
    }
    const { email, password } = data;
    let loadId: string | undefined;
    await authClient.signUp.email(
      {
        name: email,
        email: email,
        password: password,
      },
      {
        onSuccess: () => {
          toast.success("Welcome to shirugame.", {id: loadId})
          setLoading(false)
        },
        onError: (ctx) => {
          toast.error(ctx.error.message, {id: loadId});
          setLoading(false)
        },
        onRequest: () => {
          loadId = toast.loading("Wait please...")
          setLoading(true)
        }
      },
    );
  };

  return (
    <form className="flex flex-col justify-center items-center gap-5">
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          {...register("email")}
          id="email"
          placeholder="user@gmail.com"
        />
      </div>
      <div className="flex md:flex-row flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="NewPassword">New password</Label>
<Input
  type="password"
  id="NewPassword"
  {...register("password", { onChange: (e) => setCPass(e.target.value) })}
/>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Retype your password</Label>
          <Input type="password"  id="password" />
        </div>
      </div>
      <PasswordStrengthBar
        password={cpass}
        shortScoreWord="Too weak"
        scoreWords={["Weak", "Fair", "Good", "Strong", "Very strong"]}
        onChangeScore={(score) => setScore(score)}
      />
      <ButtonMotion
        className="w-full"
        whileTap={{ scale: 0.98 }}
        onClick={handleSubmit(handleClick)}
        disabled={loading}
      >
        Sign up
      </ButtonMotion>
      <Link href="/auth/sign-in" className=" text-sm hover:underline">
        Already have an account ?
      </Link>
    </form>
  );
};
