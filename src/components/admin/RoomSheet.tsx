"use client";

import { useState, useId } from "react";
import { Button } from "@/components/ui/shadcn-component/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/shadcn-component/dialog";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/shadcn-component/sheet";
import { Input } from "@/components/ui/shadcn-component/input";
import { Avatar } from "@/components/ui/profil/avatar";
import { Loader2, Trash2, Users, HelpCircle, Trophy, Calendar } from "lucide-react";
import { AdminRoom } from "@/types/admin";

interface RoomSheetProps {
    room: AdminRoom | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    processingId: string | null;
    onDelete: (roomId: string, reason: string) => void;
}

export const RoomSheet = ({
    room,
    open,
    onOpenChange,
    processingId,
    onDelete,
}: RoomSheetProps) => {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteReason, setDeleteReason] = useState("");
    const deleteReasonId = useId();

    if (!room) return null;

    const handleDelete = () => {
        if (!deleteReason.trim()) return;
        onDelete(room.id, deleteReason);
        setDeleteDialogOpen(false);
        setDeleteReason("");
    };

    const handleCancelDelete = () => {
        setDeleteDialogOpen(false);
        setDeleteReason("");
    };

    return (
        <>
            <Sheet open={open} onOpenChange={onOpenChange}>
                <SheetContent className="px-4 sm:px-6">
                    <SheetHeader>
                        <SheetTitle>Room Details</SheetTitle>
                        <SheetDescription>
                            View room information and manage
                        </SheetDescription>
                    </SheetHeader>
                    <div className="flex flex-col gap-6 mt-6">
                        <div className="space-y-2">
                            <h3 className="font-semibold text-lg break-words">
                                {room.title}
                            </h3>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Calendar className="h-4 w-4" />
                                {new Date(room.startDate).toLocaleDateString()}
                            </div>
                        </div>

                        <div className="flex items-center gap-4 min-w-0">
                            <Avatar
                                src=""
                                alt={room.openedBy.username || room.openedBy.name}
                                size={20}
                            />
                            <div className="min-w-0">
                                <div className="font-medium break-words">
                                    {room.openedBy.name}
                                </div>
                                <div className="text-sm text-muted-foreground break-all">
                                    {room.openedBy.email}
                                </div>
                                {room.openedBy.username && (
                                    <div className="text-sm text-muted-foreground">
                                        @{room.openedBy.username}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                                <Users className="h-4 w-4 text-muted-foreground" />
                                <div>
                                    <div className="text-muted-foreground">Players</div>
                                    <div className="font-medium">{room._count.players}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <HelpCircle className="h-4 w-4 text-muted-foreground" />
                                <div>
                                    <div className="text-muted-foreground">Questions</div>
                                    <div className="font-medium">{room._count.questions}</div>
                                </div>
                            </div>
                            {room.winner && (
                                <div className="flex items-center gap-2 col-span-2">
                                    <Trophy className="h-4 w-4 text-yellow-500" />
                                    <div>
                                        <div className="text-muted-foreground">Winner</div>
                                        <div className="font-medium">{room.winner.name}</div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="pt-4 border-t">
                            <Button
                                variant="destructive"
                                className="w-full"
                                onClick={() => setDeleteDialogOpen(true)}
                                disabled={processingId === room.id}
                            >
                                {processingId === room.id ? (
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                ) : (
                                    <Trash2 className="h-4 w-4 mr-2" />
                                )}
                                Delete Room
                            </Button>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>

            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Delete Room</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete &quot;{room.title}&quot;? This action cannot be undone.
                            The room owner will be notified.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <label htmlFor={deleteReasonId} className="text-sm font-medium">
                                Deletion Reason
                            </label>
                            <Input
                                id={deleteReasonId}
                                placeholder="Enter reason for deletion..."
                                value={deleteReason}
                                onChange={(e) => setDeleteReason(e.target.value)}
                            />
                            <p className="text-xs text-muted-foreground">
                                This reason will be sent to the room owner.
                            </p>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={handleCancelDelete}>
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleDelete}
                            disabled={!deleteReason.trim() || processingId === room.id}
                        >
                            {processingId === room.id ? (
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            ) : (
                                <Trash2 className="h-4 w-4 mr-2" />
                            )}
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};
