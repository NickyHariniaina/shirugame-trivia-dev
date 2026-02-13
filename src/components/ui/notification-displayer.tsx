import { useUser } from "@/stores/useUser";
import { useEffect, useState } from "react";
import { Notification } from "@/types/db";
import { Button } from "./shadcn-component/button";
import { EllipsisVertical } from "lucide-react";
import { Session } from "@/types/better-auth";

type NotificationDisplayerProps = {
    session: Session | null;
};

export const NotificationDisplayer = (props: NotificationDisplayerProps) => {
    const { userData, setUserData } = useUser();
    const [notifications, setNotifications] = useState<Notification[]>([]);
    useEffect(() => {
        if (userData) {
            const notifications = userData.notifications.filter(
                (notification: Notification) => notification.isDeleted == false,
            );
            const sortedNotifications = notifications.reverse();
            setNotifications(sortedNotifications);
        } else {
            setUserData(props.session?.user);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userData]);
    console.log(notifications);
    return (
        <div className="flex flex-col gap-2 m-2">
            {notifications.map((notification: Notification, index: number) => {
                return (
                    <div
                        key={index}
                        className={`flex flex-row gap-2 border p-3
            justify-between items-start rounded-xl
            ${!notification.seen ? "bg-muted/50" : ""}`}
                    >
                        <div className="flex flex-col gap-2">
                            <h4 className="text-xl font-bold">
                                {notification.header}
                            </h4>
                            <p className="text-sm">{notification.body}</p>
                        </div>
                        <EllipsisVertical size={30} />
                    </div>
                );
            })}
        </div>
    );
};
