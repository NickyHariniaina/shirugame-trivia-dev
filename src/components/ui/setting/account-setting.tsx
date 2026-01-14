import  FullScreenLoader  from "../loading/fullscreen";
import { toast } from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { useState, useEffect } from "react";
import { Separator } from "../shadcn-component/separator";
import { Button } from "../shadcn-component/button";


export const AccountSetting = () => {
  const [account, setAccount] = useState<unknown>({});
  const [isLoadingAccount, setIsLoadingAccount] = useState(true);
  useEffect(() => {
    const fetchAccountWithBetterAuth = async() => {
      try {
        const account = await authClient.listAccounts();
        if (account.error) {
          toast.error(account.error.message || "");
        }
        setAccount(account.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoadingAccount(false);
      }
    }

    fetchAccountWithBetterAuth();
  }, [])

  console.log(isLoadingAccount);
  if (isLoadingAccount) return <FullScreenLoader />

  const handleUnlink = async (providerId: string) => {
    if (providerId === "credentials") {
      toast.error("Cannot unlink credentials");
      return;
    }
    if (account.length === 1) {
      toast.error("Cannot unlink last account");
      return;
    }
    try {
      await authClient.unlinkAccount({providerId});
      toast.success("Unlinked successfully");
    } catch (error) {
      console.error(error);
      toast.error("unable to unlink");
    }
  }

  const extractProviderId = () => {
    return account.map((a: unknown) => a.providerId);
  }

  return <div className="flex flex-col gap-2 justify-center items-center p-4">
    <h2 className="text-xl font-bold">List of linked account</h2>
    {
      account.map((a: unknown, id: number) => {
        return <div key={id} className="flex flex-col gap-2 justify-center items-center">
          <Separator />
          <p>Connected using: <span className="italic">{a.providerId}</span></p>
          <p>Account created at: <span className="italic">{a.createdAt.toLocaleString()}</span></p>
          <div className="flex flex-row gap-2 justify-center items-center">
            <Button variant="outline" onClick={() => handleUnlink(a.providerId)}>Unlink</Button>
          </div>
        </div>
      })
    }
    <Separator />
    {
      !extractProviderId().includes("google") ?<div className="flex flex-col gap-2 justify-center items-center mx-4">
          <Button variant="secondary">Link Google</Button>
        </div>: null
    }
    {
      !extractProviderId().includes("github") ?<div className="flex flex-col gap-2 justify-center items-center">
          <Button variant="secondary">Link Github</Button>
        </div>: null
    }
  </div>

}
