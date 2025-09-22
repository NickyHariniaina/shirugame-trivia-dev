import { Button } from "../button";
import { Input } from "../input";
import { Label } from "../label";
export const SignIn = () => {
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
      <Button className="w-full">Sign in</Button>
    </form>
  );
};
