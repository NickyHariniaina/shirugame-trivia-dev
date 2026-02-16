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
import { Avatar } from "@/components/ui/profil/avatar";
import { UserSheet } from "@/components/admin/UserSheet";
import { Loader2, Search, MoreHorizontal } from "lucide-react";
import toast from "react-hot-toast";
import { Skeleton } from "@/components/ui/shadcn-component/skeleton";
import { YouNeedAnAccount } from "@/components/ui/chore-component/you-need-an-account";
import Link from "next/link";
import { AdminUser, Pagination } from "@/types/admin";

const Page = () => {
    const { data: session, isPending: sessionPending } =
        authClient.useSession();
    const [users, setUsers] = useState<AdminUser[]>([]);
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
    const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
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

    const openUserSheet = (user: AdminUser) => {
        setSelectedUser(user);
        setSheetOpen(true);
    };

    if (sessionPending) {
        return (
            <div className="min-h-screen bg-background">
                <div className="container mx-auto p-4 max-w-6xl">
                    <Skeleton className="h-10 w-64 mb-6" />
                    <div className="flex gap-3 mb-4">
                        <Skeleton className="h-10 flex-1" />
                        <Skeleton className="h-10 w-36" />
                        <Skeleton className="h-10 w-36" />
                    </div>
                    <div className="border rounded-lg">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[50px]">Avatar</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Score</TableHead>
                                    <TableHead className="w-[80px]">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <TableRow key={i}>
                                        <TableCell><Skeleton className="h-8 w-8 rounded-full" /></TableCell>
                                        <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                                        <TableCell><Skeleton className="h-4 w-40" /></TableCell>
                                        <TableCell><Skeleton className="h-6 w-16" /></TableCell>
                                        <TableCell><Skeleton className="h-6 w-16" /></TableCell>
                                        <TableCell><Skeleton className="h-4 w-12" /></TableCell>
                                        <TableCell><Skeleton className="h-8 w-8" /></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        );
    }
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
                            setRoleFilter(v !== "all" ? v : "");
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
                            setBannedFilter(v !== "all" ? v : "");
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

            <UserSheet
                user={selectedUser}
                open={sheetOpen}
                onOpenChange={setSheetOpen}
                session={session}
                processingId={processingId}
                onRoleChange={handleRoleChange}
                onBan={handleBan}
            />
        </div>
    );
};

export default Page;
