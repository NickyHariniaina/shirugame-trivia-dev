import { Button } from "./shadcn-component/button";
import { Notification } from "@/types/db";

type NotificationActionProps = {
    handleMarkAsRead: () => void;
    handleDelete: () => void;
    notification: Notification;
};

export const NotificationAction = (props: NotificationActionProps) => {
    return (
        <div className="flex flex-row gap-2 items-center">
            {!props.notification.seen && (
                <Button variant="outline" onClick={props.handleMarkAsRead}>
                    Mark as read
                </Button>
            )}
            <Button variant="destructive" onClick={props.handleDelete}>
                Delete
            </Button>
        </div>
    );
};
