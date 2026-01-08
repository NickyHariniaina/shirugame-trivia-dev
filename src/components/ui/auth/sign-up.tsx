"use client";
import { useState } from "react";
import { Input } from "../shadcn-component/input";
import Link from "next/link";
import { Label } from "../shadcn-component/label";
import { ShowPassButton } from "@/components/ui/button/show-paas-button";
import PasswordStrengthBar from "react-password-strength-bar";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { Button } from "../shadcn-component/button";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";

const ButtonMotion = motion.create(Button);

type FormType = {
  email: string;
  password: string;
};

export const SignUp = () => {
  const router = useRouter()
  const { register, handleSubmit } = useForm<FormType>();
  const [cpass, setCPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(0);

  const [showPass, setShowPass] = useState(false);

  const handleClick = async (data: FormType) => {
    if (score < 2) {
      toast.error("Your password is not strong enough...");
      return;
    }
    const { email, password } = data;
    let loadId: string | undefined;
    await authClient.signUp.email(
      {
        name: email,
        email,
        password,
      },
      {
        onSuccess: () => {
          toast.success("Welcome to shirugame.", { id: loadId });
          router.push("/auth/starter")
          setLoading(false);
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
          type="email"
          {...register("email")}
          id="email"
          placeholder="user@gmail.com"
        />
      </div>

      <div className="flex md:flex-row flex-col gap-4">
        <div className="flex flex-col gap-2 relative">
          <Label htmlFor="NewPassword">New password</Label>
          <Input
            type={showPass ? "text" : "password"}
            id="NewPassword"
            {...register("password", {
              onChange: (e) => setCPass(e.target.value),
            })}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Retype your password</Label>
          <Input type={showPass ? "text" : "password"} id="password" />
        </div>
      </div>

      <div className="flex flex-col justify-center items-center">
        <ShowPassButton showPass={showPass} setShowPass={setShowPass} />
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

      <Link href="/auth/sign-in" className="text-sm  hover:underline">
        Already have an account ?
      </Link>
    </form>
  );
};
