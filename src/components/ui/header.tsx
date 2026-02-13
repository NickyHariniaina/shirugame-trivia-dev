import { authClient } from "@/lib/auth-client";
import { Avatar } from "./profil/avatar";
import { Button } from "./shadcn-component/button";
import { ModeToggle } from "./button/dark-mode-toggle";
import { useUser } from "@/stores/useUser";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/shadcn-component/sheet";
import { Bell, Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import { Spinner } from "./shadcn-component/spinner";
import { Badge } from "@/components/ui/shadcn-component/badge";
import { Session } from "@/types/better-auth";
import { useEffect, useState } from "react";

type HeaderPropsType = {
    logged: boolean | undefined;
    session: Session | null;
    isPending?: boolean;
};

export const Header = (props: HeaderPropsType) => {
    const loading = useUser((state) => state.loading);
    const [containsNotificationUnseen, setContainsNotificationUnseen] = useState<boolean>(false);
    const [unseenNotificationsNumber, setUnseenNotificationsNumber] = useState<number>(0);
    const { userData } = useUser();
    const setLoading = useUser((state) => state.setLoading);
    const router = useRouter();

    useEffect(() => {
        if (userData) {
            const notifications = userData.notifications;
            const unseenNotifications = notifications.filter((notification) => !notification.seen);
            setContainsNotificationUnseen(unseenNotifications.length > 0);
            setUnseenNotificationsNumber(unseenNotifications.length);
        }
    }, [userData])
    console.log(containsNotificationUnseen);
    console.log(unseenNotificationsNumber);

    const handleLogOut = async () => {
        try {
            setLoading(true);
            await authClient.signOut({
                fetchOptions: {
                    onSuccess: () => {
                        router.push("/auth/sign-up");
                    },
                },
            });
        } catch (error) {
            console.log("There is an error while logging out.", error);
        } finally {
            setLoading(false);
        }
    };

    const handleGoToLeaderboard = () => {
        router.push("/leaderboard");
    };

    const handleGoTonotification = () => {
        router.push("/notification");
    };

    return (
        <div className="flex flex-row justify-between items-center md:m-4 rounded-3xl hover:shadow-2xl dark:hover:shadow-blue-900 transition-all duration-200 ease-in-out">
            <div className="m-5 sm:flex hidden">
                <ModeToggle />
            </div>

            <ul className="hidden sm:flex flex-row items-center gap-3 p-1">
                <Button variant="ghost" onClick={() => router.push("/room")}>
                    Rooms
                </Button>
                <Button variant="ghost" onClick={handleGoToLeaderboard}>
                    Leaderboard
                </Button>
                <Button
                    variant="ghost"
                    onClick={() => router.push("/questions")}
                >
                    Questions
                </Button>
                <Button variant="ghost" onClick={() => router.push("/setting")}>
                    Settings
                </Button>
                <Button variant="ghost" onClick={() => router.push("/contact")}>
                    Contact
                </Button>
            </ul>

            <div className="sm:hidden flex flex-row items-center m-3">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Menu className="h-6 w-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right">
                        <SheetHeader>
                            <SheetTitle>Shirugame</SheetTitle>
                            <SheetDescription>v0.0.1</SheetDescription>
                        </SheetHeader>
                        <ul className="flex flex-col gap-4 mt-8">
                            <Button
                                variant="ghost"
                                onClick={() => router.push("/room")}
                            >
                                Rooms
                            </Button>
                            <Button
                                variant="ghost"
                                onClick={handleGoToLeaderboard}
                            >
                                Leaderboard
                            </Button>
                            <Button
                                variant="ghost"
                                onClick={() => router.push("/questions")}
                            >
                                Questions
                            </Button>
                            <Button
                                variant="ghost"
                                onClick={() => router.push("/setting")}
                            >
                                Settings
                            </Button>
                            <Button
                                variant="ghost"
                                onClick={() => router.push("/contact")}
                            >
                                Contact
                            </Button>
                            {props.logged ? (
                                <Button
                                    variant="ghost"
                                    type="button"
                                    onClick={handleLogOut}
                                >
                                    {loading ? <Spinner /> : "Log out"}
                                </Button>
                            ) : null}
                        </ul>
                        <SheetFooter className="flex flex-row justify-end">
                            <div className="m-5 ">
                                <ModeToggle />
                            </div>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
            </div>

            {props.logged ? (
                <div className="flex flex-row items-center p-2 gap-3">
                    <Button variant="ghost" onClick={handleGoTonotification}>
                        <Bell />
                        {
                            containsNotificationUnseen ? (
                                <Badge
                                    variant="destructive"
                                    className=""
                                >
                                    {unseenNotificationsNumber > 99 ? "99+" : unseenNotificationsNumber}
                                </Badge>
                            ) : null
                        }
                    </Button>
                    <Avatar
                        src={props.session?.user?.image || ""}
                        alt={props.session?.user?.username || ""}
                        size={40}
                        onClick={() => router.push("/setting")}
                    />
                    <Button
                        variant="default"
                        type="button"
                        className="hidden md:block"
                        onClick={handleLogOut}
                    >
                        Log out
                    </Button>
                </div>
            ) : (
                <div className="flex flex-row items-center gap-2 p-4">
                    <Button
                        variant="default"
                        type="button"
                        onClick={() => {
                            router.push("/auth/sign-in");
                        }}
                    >
                        Log in
                    </Button>
                    <Button
                        variant="default"
                        type="button"
                        onClick={() => {
                            router.push("/auth/sign-up");
                        }}
                    >
                        Sign up
                    </Button>
                </div>
            )}
        </div>
    );
};
