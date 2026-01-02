"use client"
import { useState } from "react";
import { Button } from "../button";
import { ProfilBody } from "../profil/ProfilBody";
import { Separator } from "../separator";
import { ProfilSettings } from "../profil/ProfilSettings";
import { ScrollArea } from "../scroll-area";
import { PartUnderConstruction } from "../ChoreComponent/PartUnderConstruction";

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
};

export const SettingBodyContent = ({ user }: SettingBodyContentProps) => {
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
        >
          Profil
        </Button>
        <Button
          variant={accountShowed ? "outline" : "ghost"}
          onClick={() => handleShow("account")}
        >
          Account
        </Button>
        <Button
          variant={accessibilityShowed ? "outline" : "ghost"}
          onClick={() => handleShow("accessibility")}
        >
          Accessibility
        </Button>
        <Button
          variant={sessionShowed ? "outline" : "ghost"}
          onClick={() => handleShow("session")}
        >
          Session
        </Button>
        <Button
          variant={appearanceShowed ? "outline" : "ghost"}
          onClick={() => handleShow("appearance")}
        >
          Appearance
        </Button>
      </aside>

      <div className="flex-1 flex flex-col min-h-0">
        {profilShowed && (
          <ScrollArea className="flex-1 flex flex-col gap-4 min-h-0">
            <ProfilBody />
            <Separator className="my-4" />
            <ProfilSettings />
          </ScrollArea>
        )}

        {accountShowed && (
          <ScrollArea className="flex-1 flex flex-col gap-4 min-h-0">
            <PartUnderConstruction />
          </ScrollArea>
        )}

        {accessibilityShowed && (
          <ScrollArea className="flex-1 flex flex-col gap-4 min-h-0">
            <PartUnderConstruction />
          </ScrollArea>
        )}

        {sessionShowed && (
          <ScrollArea className="flex-1 flex flex-col gap-4 min-h-0">
            <PartUnderConstruction />
          </ScrollArea>
        )}

        {appearanceShowed && (
          <ScrollArea className="flex-1 flex flex-col gap-4 min-h-0">
            <PartUnderConstruction />
          </ScrollArea>
        )}
      </div>
    </div>
  );
};
