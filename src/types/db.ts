export type User = {
    id: string;
    name: string;
    username?: string | null | undefined;
    rank?: number;
    highestScore?: number;
    email: string;
    emailVerified: boolean;
    displayUsername?: string | null | undefined;
    image?: string | null | undefined;
    createdAt: Date;
    updatedAt: Date;
    sessions: Session[];
    accounts: Account[];
    openedRooms: Room[];
    wonRooms: Room[];
    joinedRooms: Room[];
};

export type Room = {
    id: string;
    title: string;
    chronoTiming: number;
    winnerId?: string;
    winner?: User;
    questions: Question[];
    players: User[];
    startDate: Date;
    openedById: string;
    openedBy: User;
};

export type Question = {
    id: string;
    question: string;
    typeId: string;
    type: Type;
    Score: number;
    Answer: string;
    roomId: string;
    room: Room;
    isValidated: boolean;
};

export type Type = {
    id: string;
    name: string;
    questions: Question[];
};

export type Session = {
    id: string;
    expiresAt: Date;
    token: string;
    createdAt: Date;
    updatedAt: Date;
    ipAddress?: string;
    userAgent?: string;
    userId: string;
    user: User;
};

export type Account = {
    id: string;
    accountId: string;
    providerId: string;
    userId: string;
    user: User;
    accessToken?: string;
    refreshToken?: string;
    idToken?: string;
    accessTokenExpiresAt?: Date;
    refreshTokenExpiresAt?: Date;
    scope?: string;
    password?: string;
    createdAt: Date;
    updatedAt: Date;
};

export type Verification = {
    id: string;
    identifier: string;
    value: string;
    expiresAt: Date;
    createdAt: Date;
    updatedAt: Date;
};

export type Notification = {
    id: string;
    seen: boolean;
    createdAt: Date;
    userId: string;
    header: string;
    isDeleted: boolean;
    body: string;
    user: User;
};
