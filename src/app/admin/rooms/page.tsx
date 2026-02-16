"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/ui/header";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/shadcn-component/button";
import { Badge } from "@/components/ui/shadcn-component/badge";
import { Input } from "@/components/ui/shadcn-component/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/shadcn-component/table";
import { RoomSheet } from "@/components/admin/RoomSheet";
import { Loader2, Search, MoreHorizontal, Users, HelpCircle } from "lucide-react";
import toast from "react-hot-toast";
import FullScreenLoader from "@/components/ui/loading/fullscreen";
import { YouNeedAnAccount } from "@/components/ui/chore-component/you-need-an-account";
import Link from "next/link";
import { AdminRoom, Pagination } from "@/types/admin";

const Page = () => {
    const { data: session, isPending: sessionPending } =
        authClient.useSession();
    const [rooms, setRooms] = useState<AdminRoom[]>([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState<Pagination>({
        page: 1,
        limit: 20,
        total: 0,
        totalPages: 0,
    });
    const [search, setSearch] = useState("");
    const [processingId, setProcessingId] = useState<string | null>(null);
    const [selectedRoom, setSelectedRoom] = useState<AdminRoom | null>(null);
    const [sheetOpen, setSheetOpen] = useState(false);

    useEffect(() => {
        if (session?.user.role === "admin") {
            fetchRooms();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session, pagination.page]);

    const fetchRooms = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams();
            params.set("page", pagination.page.toString());
            params.set("limit", "20");
            if (search) params.set("search", search);

            const res = await fetch(`/api/admin/rooms?${params}`);
            const data = await res.json();
            if (res.ok) {
                setRooms(data.data || []);
                setPagination(data.pagination);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch rooms");
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        setPagination((prev) => ({ ...prev, page: 1 }));
        fetchRooms();
    };

    const handleDelete = async (roomId: string, reason: string) => {
        setProcessingId(roomId);
        try {
            const res = await fetch(`/api/admin/rooms/${roomId}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ reason }),
            });

            if (res.ok) {
                toast.success("Room deleted successfully");
                setRooms((prev) => prev.filter((r) => r.id !== roomId));
                if (selectedRoom?.id === roomId) {
                    setSelectedRoom(null);
                    setSheetOpen(false);
                }
            } else {
                const data = await res.json();
                toast.error(data.message || "Failed to delete room");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete room");
        } finally {
            setProcessingId(null);
        }
    };

    const openRoomSheet = (room: AdminRoom) => {
        setSelectedRoom(room);
        setSheetOpen(true);
    };

    if (sessionPending) return <FullScreenLoader />;
    if (!session) return <YouNeedAnAccount />;
    if (session.user.role !== "admin") {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <h2 className="text-2xl font-bold">Access Denied</h2>
                <p>You do not have permission to view this page.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <Header logged={true} session={session} />

            <div className="container mx-auto p-4 max-w-6xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-bold">
                            Room Management
                        </h2>
                        <p className="text-muted-foreground text-sm sm:text-base">
                            View and manage rooms
                        </p>
                    </div>
                    <Link href="/setting">
                        <Button variant="outline" size="sm">
                            Back
                        </Button>
                    </Link>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mb-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search rooms..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={(e) =>
                                e.key === "Enter" && handleSearch()
                            }
                            className="pl-9"
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center p-8">
                        <Loader2 className="h-8 w-8 animate-spin" />
                    </div>
                ) : (
                    <>
                        <div className="border rounded-lg overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Creator</TableHead>
                                        <TableHead className="w-[100px]">
                                            <div className="flex items-center gap-1">
                                                <Users className="h-4 w-4" />
                                                Players
                                            </div>
                                        </TableHead>
                                        <TableHead className="w-[100px]">
                                            <div className="flex items-center gap-1">
                                                <HelpCircle className="h-4 w-4" />
                                                Questions
                                            </div>
                                        </TableHead>
                                        <TableHead>Created</TableHead>
                                        <TableHead className="w-[80px]">
                                            Actions
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {rooms.length === 0 ? (
                                        <TableRow>
                                            <TableCell
                                                colSpan={6}
                                                className="text-center py-8 text-muted-foreground"
                                            >
                                                No rooms found
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        rooms.map((room) => (
                                            <TableRow key={room.id}>
                                                <TableCell className="font-medium">
                                                    <div className="break-words max-w-[200px]">
                                                        {room.title}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="break-words">
                                                        {room.openedBy.name}
                                                    </div>
                                                    {room.openedBy.username && (
                                                        <div className="text-xs text-muted-foreground">
                                                            @{room.openedBy.username}
                                                        </div>
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="secondary">
                                                        {room._count.players}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="outline">
                                                        {room._count.questions}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-sm">
                                                    {new Date(
                                                        room.startDate,
                                                    ).toLocaleDateString()}
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() =>
                                                            openRoomSheet(room)
                                                        }
                                                    >
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>

                        {pagination.totalPages > 1 && (
                            <div className="flex items-center justify-between mt-4">
                                <div className="text-sm text-muted-foreground">
                                    Showing{" "}
                                    {(pagination.page - 1) * pagination.limit +
                                        1}{" "}
                                    to{" "}
                                    {Math.min(
                                        pagination.page * pagination.limit,
                                        pagination.total,
                                    )}{" "}
                                    of {pagination.total} rooms
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        disabled={pagination.page === 1}
                                        onClick={() =>
                                            setPagination((p) => ({
                                                ...p,
                                                page: p.page - 1,
                                            }))
                                        }
                                    >
                                        Previous
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        disabled={
                                            pagination.page >=
                                            pagination.totalPages
                                        }
                                        onClick={() =>
                                            setPagination((p) => ({
                                                ...p,
                                                page: p.page + 1,
                                            }))
                                        }
                                    >
                                        Next
                                    </Button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>

            <RoomSheet
                room={selectedRoom}
                open={sheetOpen}
                onOpenChange={setSheetOpen}
                processingId={processingId}
                onDelete={handleDelete}
            />
        </div>
    );
};

export default Page;
