"use client";
import Link from "next/link";
import { Button } from "../button";
import { Input } from "../input";
import { Label } from "../label";
import PasswordStrengthBar from "react-password-strength-bar";
export const SignUp = () => {
  return (
    <form className="flex flex-col justify-center items-center gap-5">
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" placeholder="user@gmail.com" />
      </div>
      <div className="flex md:flex-row flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="NewPassword">New password</Label>
          <Input type="password" id="NewPassword" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Retype your password</Label>
          <Input type="password" id="password" />
        </div>
      </div>
      <PasswordStrengthBar
        shortScoreWord="Too short"
        scoreWords={["Weak", "Fair", "Good", "Strong", "Very strong"]}
      />
      <Button className="w-full">Sign in</Button>
      <Link href="/auth/sign-in" className=" text-sm hover:underline">
        I already have an account.
      </Link>
    </form>
  );
};
