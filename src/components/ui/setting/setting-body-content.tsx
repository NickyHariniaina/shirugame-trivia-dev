"use client"
import { useState } from "react";
import { Button } from "../shadcn-component/button";
import { ProfilBody } from "../profil/profil-body";
import { Separator } from "../shadcn-component/separator";
import { ProfilSettings } from "../profil/profil-setting";
import { PartUnderConstruction } from "../chore-component/part-under-construction";
import { Session } from "@/types/better-auth";
import { AccountSetting } from "./account-setting";

interface UserSession {
  id: string;
  name: string;
  username?: string | null;
  displayUsername?: string | null;
  email: string;
  emailVerified: boolean;
  image?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

type SettingBodyContentProps = {
  user: UserSession | undefined;
  session: Session
};

export const SettingBodyContent = ({ user, session }: SettingBodyContentProps) => {
  const [profilShowed, setProfilShowed] = useState(true);
  const [accountShowed, setAccountShowed] = useState(false);
  const [accessibilityShowed, setAccessibilityShowed] = useState(false);
  const [sessionShowed, setSessionShowed] = useState(false);
  const [appearanceShowed, setAppearanceShowed] = useState(false);

  const handleShow = (section: string) => {
    setProfilShowed(section === "profil");
    setAccountShowed(section === "account");
    setAccessibilityShowed(section === "accessibility");
    setSessionShowed(section === "session");
    setAppearanceShowed(section === "appearance");
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 h-screen">
      {/* Sidebar */}
      <aside className="flex-none md:w-48 flex flex-col gap-3">
        <Button
          variant={profilShowed ? "outline" : "ghost"}
          onClick={() => handleShow("profil")}
          className="justify-start"
        >
          Profil
        </Button>
        <Button
          variant={accountShowed ? "outline" : "ghost"}
          onClick={() => handleShow("account")}
          className="justify-start"
        >
          Account
        </Button>
        <Button
          variant={accessibilityShowed ? "outline" : "ghost"}
          onClick={() => handleShow("accessibility")}
          className="justify-start"
        >
          Accessibility
        </Button>
        <Button
          variant={sessionShowed ? "outline" : "ghost"}
          onClick={() => handleShow("session")}
          className="justify-start"
        >
          Session
        </Button>
        <Button
          variant={appearanceShowed ? "outline" : "ghost"}
          onClick={() => handleShow("appearance")}
          className="justify-start"
        >
          Appearance
        </Button>
      </aside>

      <div className="flex-1 flex flex-col min-h-0">
        {profilShowed && (
          <div className="flex flex-col h-[75%]">
            <ProfilBody session={session}/>
            <Separator className="my-4" />
            <ProfilSettings />
          </div>
        )}

        {accountShowed && (
          <div className="flex-1 flex flex-col gap-4 min-h-0">
            <AccountSetting />
          </div>
        )}

        {accessibilityShowed && (
          <div className="flex-1 flex flex-col gap-4 min-h-0">
            <PartUnderConstruction />
          </div>
        )}

        {sessionShowed && (
          <div className="flex-1 flex flex-col gap-4 min-h-0">
            <PartUnderConstruction />
          </div>
        )}

        {appearanceShowed && (
          <div className="flex-1 flex flex-col gap-4 min-h-0">
            <PartUnderConstruction />
          </div>
        )}
      </div>
    </div>
  );
};
