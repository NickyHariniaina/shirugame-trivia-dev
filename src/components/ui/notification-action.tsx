import { Notification } from "@/types/db";
import { EllipsisVertical } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "./shadcn-component/popover";
import { Button } from "./shadcn-component/button";

type NotificationActionProps = {
    handleMarkAsRead: () => void;
    handleDelete: () => void;
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
                            onClick={props.handleMarkAsRead}
                            variant="outline"
                        >
                            Mark as read
                        </Button>
                    )}
                    <Button onClick={props.handleDelete} variant="outline">
                        Delete
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );
};
