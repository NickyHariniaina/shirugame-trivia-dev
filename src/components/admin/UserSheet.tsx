"use client";

import { Button } from "@/components/ui/shadcn-component/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/shadcn-component/select";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/shadcn-component/sheet";
import { Avatar } from "@/components/ui/profil/avatar";
import { Loader2, Ban } from "lucide-react";
import { AdminUser } from "@/types/admin";
import { Session } from "@/types/better-auth";

interface UserSheetProps {
    user: AdminUser | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    session: Session;
    processingId: string | null;
    onRoleChange: (userId: string, role: string) => void;
    onBan: (userId: string, banned: boolean) => void;
}

export const UserSheet = ({
    user,
    open,
    onOpenChange,
    session,
    processingId,
    onRoleChange,
    onBan,
}: UserSheetProps) => {
    if (!user) return null;

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="px-4 sm:px-6">
                <SheetHeader>
                    <SheetTitle>User Details</SheetTitle>
                    <SheetDescription>
                        Manage user role and ban status
                    </SheetDescription>
                </SheetHeader>
                <div className="flex flex-col gap-6 mt-6">
                    <div className="flex items-center gap-4 min-w-0">
                        <Avatar
                            key={user.id}
                            src={user.image || ""}
                            alt={user.username || ""}
                            size={20}
                        />
                        <div className="min-w-0">
                            <div className="font-semibold text-lg break-words">
                                {user.name}
                            </div>
                            <div className="text-sm text-muted-foreground break-all">
                                {user.email}
                            </div>
                            {user.username && (
                                <div className="text-sm text-muted-foreground break-words">
                                    @{user.username}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <div className="text-muted-foreground">
                                Highest Score
                            </div>
                            <div className="font-medium">
                                {user.highestScore || 0}
                            </div>
                        </div>
                        <div>
                            <div className="text-muted-foreground">
                                Rank
                            </div>
                            <div className="font-medium">
                                {user.rank || "N/A"}
                            </div>
                        </div>
                        <div>
                            <div className="text-muted-foreground">
                                Rooms Created
                            </div>
                            <div className="font-medium">
                                {user._count.openedRooms}
                            </div>
                        </div>
                        <div>
                            <div className="text-muted-foreground">
                                Rooms Joined
                            </div>
                            <div className="font-medium">
                                {user._count.joinedRooms}
                            </div>
                        </div>
                        <div>
                            <div className="text-muted-foreground">
                                Joined
                            </div>
                            <div className="font-medium">
                                {new Date(
                                    user.createdAt,
                                ).toLocaleDateString()}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div>
                            <label className="text-sm font-medium">
                                Role
                            </label>
                            <Select
                                value={user.role}
                                onValueChange={(v) =>
                                    onRoleChange(user.id, v)
                                }
                                disabled={
                                    processingId === user.id ||
                                    user.id === session.user.id
                                }
                            >
                                <SelectTrigger className="mt-1">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="user">
                                        User
                                    </SelectItem>
                                    <SelectItem value="admin">
                                        Admin
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            {user.id === session.user.id && (
                                <p className="text-xs text-muted-foreground mt-1">
                                    You cannot change your own role
                                </p>
                            )}
                        </div>

                        <div className="pt-2">
                            {user.banned ? (
                                <Button
                                    variant="default"
                                    className="w-full"
                                    onClick={() =>
                                        onBan(user.id, false)
                                    }
                                    disabled={processingId === user.id}
                                >
                                    {processingId === user.id ? (
                                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    ) : (
                                        <Ban className="h-4 w-4 mr-2" />
                                    )}
                                    Unban User
                                </Button>
                            ) : (
                                <Button
                                    variant="destructive"
                                    className="w-full"
                                    onClick={() =>
                                        onBan(user.id, true)
                                    }
                                    disabled={
                                        processingId === user.id ||
                                        user.id === session.user.id
                                    }
                                >
                                    {processingId === user.id ? (
                                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    ) : (
                                        <Ban className="h-4 w-4 mr-2" />
                                    )}
                                    Ban User
                                </Button>
                            )}
                            {user.id === session.user.id && (
                                <p className="text-xs text-muted-foreground mt-1 text-center">
                                    You cannot ban yourself
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
};
