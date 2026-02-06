import FullScreenLoader from "../loading/fullscreen";
import { toast } from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { useState, useEffect } from "react";
import { Separator } from "../shadcn-component/separator";
import { Button } from "../shadcn-component/button";

type Account = {
  accountId: string,
  createdAt: Date,
  id: string,
  providerId: string,
  scopes: string[],
  updatedAt: Date,
}

export const AccountSetting = () => {
  const [account, setAccount] = useState<Account[]>([]);
  const [isLoadingAccount, setIsLoadingAccount] = useState(true);
  useEffect(() => {
    const fetchAccountWithBetterAuth = async () => {
      try {
        const account = await authClient.listAccounts();
        if (account.error) {
          toast.error(account.error.message || "");
        }
        const normalized = (account.data ?? []).map((a: Account) => ({
          ...a,
          createdAt: new Date(a.createdAt),
          updatedAt: new Date(a.updatedAt),
        })) as Account[];
        setAccount(normalized);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoadingAccount(false);
      }
    };

    fetchAccountWithBetterAuth();
  }, []);

  console.log(isLoadingAccount);
  if (isLoadingAccount) return <FullScreenLoader />;

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
      await authClient.unlinkAccount({ providerId });
      toast.success("Unlinked successfully");
    } catch (error) {
      console.error(error);
      toast.error("unable to unlink");
    }
  };

  const extractProviderId = () => {
    return account.map((a: Account) => a.providerId);
  };

  return (
    <div className="flex flex-col gap-2 justify-center items-center p-4">
      <h2 className="text-xl font-bold">List of linked account</h2>
      {account.map((a: Account, id: number) => {
        return (
          <div
            key={id}
            className="flex flex-col gap-2 justify-center items-center"
          >
            <Separator />
            <p>
              Connected using: <span className="italic">{a.providerId}</span>
            </p>
            <p>
              Account created at:{" "}
              <span className="italic">{a.createdAt.toLocaleString()}</span>
            </p>
            <div className="flex flex-row gap-2 justify-center items-center">
              <Button
                variant="outline"
                onClick={() => handleUnlink(a.providerId)}
              >
                Unlink
              </Button>
            </div>
          </div>
        );
      })}
      <Separator />
      {!extractProviderId().includes("google") ? (
        <div className="flex flex-col gap-2 justify-center items-center mx-4">
          <Button variant="secondary" onClick={async () => {
            await authClient.linkSocial({provider: "google", callbackURL: "/setting"})
          }}>
            Link Google
          </Button>
        </div>
      ) : null}
      {!extractProviderId().includes("github") ? (
        <div className="flex flex-col gap-2 justify-center items-center mx-4">
          <Button variant="secondary" onClick={async () => {
            await authClient.linkSocial({provider: "github", callbackURL: "/settings"})
          }}>
            Link Github
          </Button>
        </div>
      ) : null}
    </div>
  );
};
