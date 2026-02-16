# AGENTS.md

This file provides guidelines for AI agents working on the Shirugame codebase.

## Build/Run Commands

```bash
# Development server (with Socket.io)
npm run dev

# Build for production
npm run build

# Build with Socket.io server
npm run build:socket

# Start production server
npm start

# Start Socket.io server
npm run start:socket

# Lint code
npm run lint

# Generate Prisma client
npx prisma generate
```

**Note:** No test runner is configured. To add tests, use Jest or Vitest.

## Tech Stack

- **Framework:** Next.js 15+ with App Router
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui (New York style)
- **Database:** Prisma ORM
- **Auth:** Better Auth
- **State:** Zustand
- **Real-time:** Socket.io
- **Icons:** Lucide React

## Code Style Guidelines

### Imports

```typescript
// Order: React/Next → External libs → Internal aliases → Relative
import * as React from "react";
import { useRouter } from "next/navigation";
import { create } from "zustand";
import { Button } from "@/components/ui/shadcn-component/button";
import { useUser } from "@/stores/useUser";
import { cn } from "@/lib/utils";
```

### Path Aliases

Always use path aliases from `tsconfig.json`:
- `@/*` → `./src/*`
- `@/components/*` → `./src/components/*`
- `@/lib/*` → `./src/lib/*`
- `@/stores/*` → `./src/stores/*`
- `@/hooks/*` → `./src/hooks/*`
- `@/types/*` → `./src/types/*`
- `@/utils/*` → `./src/utils/*`

### Naming Conventions

- **Components:** PascalCase (e.g., `Button.tsx`, `UserProfile.tsx`)
- **Hooks:** camelCase with `use` prefix (e.g., `useUser.ts`, `useReloadUserData.ts`)
- **Stores:** camelCase with `use` prefix (e.g., `useUser.ts`, `useSocketStore.ts`)
- **Utilities:** camelCase (e.g., `utils.ts`, `func.ts`)
- **Types:** PascalCase (e.g., `User.ts`, `RoomDto.ts`)
- **API Routes:** lowercase (e.g., `route.ts`)

### TypeScript

- Enable strict mode
- Define explicit return types for functions
- Use `type` for object shapes, `interface` for extensible contracts
- Prefer `undefined` over `null` for optional values

```typescript
// Good
type UserProps = {
  id: string;
  name: string;
  email?: string;
};

export const getUser = async (id: string): Promise<User> => {
  // ...
};
```

### Component Structure

```typescript
import * as React from "react";
import { cn } from "@/lib/utils";

type MyComponentProps = {
  className?: string;
  children: React.ReactNode;
};

export const MyComponent = ({ className, children }: MyComponentProps) => {
  return (
    <div className={cn("base-classes", className)}>
      {children}
    </div>
  );
};
```

### API Routes Pattern

```typescript
import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const data = await prisma.model.findMany();
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
```

### Error Handling

- Use try-catch blocks in async functions
- Log errors with `console.error()`
- Return appropriate HTTP status codes
- Use toast notifications for user feedback (react-hot-toast or sonner)

### Styling (Tailwind)

- Use `cn()` utility from `@/lib/utils` for conditional classes
- Follow shadcn/ui conventions
- Support dark mode with `dark:` prefix
- Use CSS variables from `globals.css` for theming

```typescript
import { cn } from "@/lib/utils";

className={cn(
  "base-classes",
  isActive && "active-classes",
  className
)}
```

### Zustand Store Pattern

```typescript
import { create } from "zustand";

type Store = {
  data: Type | null;
  setData: (data: Type) => void;
};

export const useStore = create<Store>((set) => ({
  data: null,
  setData: (data) => set({ data }),
}));
```

### Prisma

- Import from `@/generated/prisma` (not `@prisma/client`)
- Use singleton pattern from `src/lib/prisma.ts`
- Run `prisma generate` after schema changes

## File Organization

```
src/
├── app/              # Next.js App Router
│   ├── api/          # API routes
│   ├── page.tsx      # Pages
│   └── layout.tsx    # Layouts
├── components/
│   ├── ui/
│   │   └── shadcn-component/  # shadcn/ui components
│   └── *.tsx         # Custom components
├── hooks/            # Custom React hooks
├── lib/              # Core utilities (prisma, auth, etc.)
├── services/         # Business logic
├── stores/           # Zustand stores
├── types/            # TypeScript types
└── utils/            # Helper functions
```

## Environment Variables

Required in `.env`:
- `DATABASE_URL` - Prisma database connection
- `NEXT_PUBLIC_APP_URL` - App URL
- Auth credentials (Better Auth)
- Socket.io configuration

## Common Tasks

### Add shadcn Component
```bash
npx shadcn add button
```

### Database Migration
```bash
npx prisma migrate dev --name migration_name
```

### Generate Prisma Client
```bash
npx prisma generate
```
