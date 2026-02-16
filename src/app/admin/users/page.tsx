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
    SheetTrigger,
} from "@/components/ui/shadcn-component/sheet";
import { Avatar } from "@/components/ui/profil/avatar";
import { Loader2, Search, Ban, Shield, MoreHorizontal } from "lucide-react";
import toast from "react-hot-toast";
import FullScreenLoader from "@/components/ui/loading/fullscreen";
import { YouNeedAnAccount } from "@/components/ui/chore-component/you-need-an-account";
import Link from "next/link";

interface User {
    id: string;
    name: string;
    username: string | null;
    email: string;
    image: string | null;
    role: string;
    banned: boolean | null;
    banReason: string | null;
    banExpires: string | null;
    highestScore: number | null;
    rank: number | null;
    createdAt: Date;
    _count: {
        notifications: number;
        openedRooms: number;
        joinedRooms: number;
    };
}

interface Pagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

const Page = () => {
    const { data: session, isPending: sessionPending } =
        authClient.useSession();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState<Pagination>({
        page: 1,
        limit: 20,
        total: 0,
        totalPages: 0,
    });
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("");
    const [bannedFilter, setBannedFilter] = useState("");
    const [processingId, setProcessingId] = useState<string | null>(null);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [sheetOpen, setSheetOpen] = useState(false);

    useEffect(() => {
        if (session?.user.role === "admin") {
            fetchUsers();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session, pagination.page, roleFilter, bannedFilter]);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams();
            params.set("page", pagination.page.toString());
            params.set("limit", "20");
            if (search) params.set("search", search);
            if (roleFilter) params.set("role", roleFilter);
            if (bannedFilter) params.set("banned", bannedFilter);

            const res = await fetch(`/api/admin/users?${params}`);
            const data = await res.json();
            if (res.ok) {
                setUsers(data.data || []);
                setPagination(data.pagination);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch users");
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        setPagination((prev) => ({ ...prev, page: 1 }));
        fetchUsers();
    };

    const handleBan = async (userId: string, banned: boolean) => {
        setProcessingId(userId);
        try {
            const res = await fetch(`/api/admin/users/${userId}/ban`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ banned }),
            });

            if (res.ok) {
                toast.success(banned ? "User banned" : "User unbanned");
                setUsers((prev) =>
                    prev.map((u) => (u.id === userId ? { ...u, banned } : u)),
                );
                if (selectedUser?.id === userId) {
                    setSelectedUser((prev) =>
                        prev ? { ...prev, banned } : null,
                    );
                }
            } else {
                const data = await res.json();
                toast.error(data.message || "Failed to update ban status");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to update ban status");
        } finally {
            setProcessingId(null);
        }
    };

    const handleRoleChange = async (userId: string, role: string) => {
        setProcessingId(userId);
        try {
            const res = await fetch(`/api/admin/users/${userId}/role`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ role }),
            });

            if (res.ok) {
                toast.success(`Role changed to ${role}`);
                setUsers((prev) =>
                    prev.map((u) => (u.id === userId ? { ...u, role } : u)),
                );
                if (selectedUser?.id === userId) {
                    setSelectedUser((prev) =>
                        prev ? { ...prev, role } : null,
                    );
                }
            } else {
                const data = await res.json();
                toast.error(data.message || "Failed to change role");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to change role");
        } finally {
            setProcessingId(null);
        }
    };

    const openUserSheet = (user: User) => {
        setSelectedUser(user);
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
                            User Management
                        </h2>
                        <p className="text-muted-foreground text-sm sm:text-base">
                            Manage users, roles, and bans
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
                            placeholder="Search users..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={(e) =>
                                e.key === "Enter" && handleSearch()
                            }
                            className="pl-9"
                        />
                    </div>
                    <Select
                        value={roleFilter}
                        onValueChange={(v) => {
                            setRoleFilter(v != "all" ? v : "");
                            setPagination((p) => ({ ...p, page: 1 }));
                        }}
                    >
                        <SelectTrigger className="w-full sm:w-[150px]">
                            <SelectValue placeholder="All Roles" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Roles</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="user">User</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select
                        value={bannedFilter}
                        onValueChange={(v) => {
                            setBannedFilter(v != "all" ? v : "");
                            setPagination((p) => ({ ...p, page: 1 }));
                        }}
                    >
                        <SelectTrigger className="w-full sm:w-[150px]">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="false">Active</SelectItem>
                            <SelectItem value="true">Banned</SelectItem>
                        </SelectContent>
                    </Select>
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
                                        <TableHead className="w-[50px]">
                                            Avatar
                                        </TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Role</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Score</TableHead>
                                        <TableHead className="w-[80px]">
                                            Actions
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {users.length === 0 ? (
                                        <TableRow>
                                            <TableCell
                                                colSpan={7}
                                                className="text-center py-8 text-muted-foreground"
                                            >
                                                No users found
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        users.map((user) => (
                                            <TableRow key={user.id}>
                                                <TableCell>
                                                    <Avatar
                                                        key={user.id}
                                                        src={user.image || ""}
                                                        alt={
                                                            user.username || ""
                                                        }
                                                        size={20}
                                                    />
                                                </TableCell>
                                                <TableCell className="font-medium">
                                                    <div>{user.name}</div>
                                                    {user.username && (
                                                        <div className="text-xs text-muted-foreground">
                                                            @{user.username}
                                                        </div>
                                                    )}
                                                </TableCell>
                                                <TableCell className="text-sm">
                                                    {user.email}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant={
                                                            user.role ===
                                                            "admin"
                                                                ? "default"
                                                                : "secondary"
                                                        }
                                                    >
                                                        {user.role}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    {user.banned ? (
                                                        <Badge variant="destructive">
                                                            Banned
                                                        </Badge>
                                                    ) : (
                                                        <Badge variant="outline">
                                                            Active
                                                        </Badge>
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    {user.highestScore || 0}
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() =>
                                                            openUserSheet(user)
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
                                    of {pagination.total} users
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

            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetContent className="px-4 sm:px-6">
                    <SheetHeader>
                        <SheetTitle>User Details</SheetTitle>
                        <SheetDescription>
                            Manage user role and ban status
                        </SheetDescription>
                    </SheetHeader>
                    {selectedUser && (
                        <div className="flex flex-col gap-6 mt-6">
                            <div className="flex items-center gap-4 min-w-0">
                                <Avatar
                                    key={selectedUser.id}
                                    src={selectedUser.image || ""}
                                    alt={selectedUser.username || ""}
                                    size={20}
                                />
                                <div className="min-w-0">
                                    <div className="font-semibold text-lg break-words">
                                        {selectedUser.name}
                                    </div>
                                    <div className="text-sm text-muted-foreground break-all">
                                        {selectedUser.email}
                                    </div>
                                    {selectedUser.username && (
                                        <div className="text-sm text-muted-foreground break-words">
                                            @{selectedUser.username}
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
                                        {selectedUser.highestScore || 0}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-muted-foreground">
                                        Rank
                                    </div>
                                    <div className="font-medium">
                                        {selectedUser.rank || "N/A"}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-muted-foreground">
                                        Rooms Created
                                    </div>
                                    <div className="font-medium">
                                        {selectedUser._count.openedRooms}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-muted-foreground">
                                        Rooms Joined
                                    </div>
                                    <div className="font-medium">
                                        {selectedUser._count.joinedRooms}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-muted-foreground">
                                        Joined
                                    </div>
                                    <div className="font-medium">
                                        {new Date(
                                            selectedUser.createdAt,
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
                                        value={selectedUser.role}
                                        onValueChange={(v) =>
                                            handleRoleChange(selectedUser.id, v)
                                        }
                                        disabled={
                                            processingId === selectedUser.id ||
                                            selectedUser.id === session.user.id
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
                                    {selectedUser.id === session.user.id && (
                                        <p className="text-xs text-muted-foreground mt-1">
                                            You cannot change your own role
                                        </p>
                                    )}
                                </div>

                                <div className="pt-2">
                                    {selectedUser.banned ? (
                                        <Button
                                            variant="default"
                                            className="w-full"
                                            onClick={() =>
                                                handleBan(
                                                    selectedUser.id,
                                                    false,
                                                )
                                            }
                                            disabled={
                                                processingId === selectedUser.id
                                            }
                                        >
                                            {processingId ===
                                            selectedUser.id ? (
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
                                                handleBan(selectedUser.id, true)
                                            }
                                            disabled={
                                                processingId ===
                                                    selectedUser.id ||
                                                selectedUser.id ===
                                                    session.user.id
                                            }
                                        >
                                            {processingId ===
                                            selectedUser.id ? (
                                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                            ) : (
                                                <Ban className="h-4 w-4 mr-2" />
                                            )}
                                            Ban User
                                        </Button>
                                    )}
                                    {selectedUser.id === session.user.id && (
                                        <p className="text-xs text-muted-foreground mt-1 text-center">
                                            You cannot ban yourself
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </SheetContent>
            </Sheet>
        </div>
    );
};

export default Page;
