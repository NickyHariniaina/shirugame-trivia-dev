import { Notification } from "@/types/db";
import { EllipsisVertical } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "./shadcn-component/popover";
import { Button } from "./shadcn-component/button";

type NotificationActionProps = {
    handleMarkAsRead: (id: string) => void;
    handleDelete: (id: string) => void;
    notification: Notification;
};

export const NotificationAction = (props: NotificationActionProps) => {
    return (
        <Popover>
            <PopoverTrigger>
                <EllipsisVertical size={30} />
            </PopoverTrigger>
            <PopoverContent align="end">
                <div className="flex flex-col gap-2 justify-center">
                    {!props.notification.seen && (
                        <Button
                            onClick={() => props.handleMarkAsRead(props.notification.id)}
                            variant="outline"
                        >
                            Mark as read
                        </Button>
                    )}
                    <Button onClick={() => props.handleDelete(props.notification.id)} variant="outline">
                        Delete
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );
};
