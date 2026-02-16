export interface AdminUser {
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

export interface Pagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}
