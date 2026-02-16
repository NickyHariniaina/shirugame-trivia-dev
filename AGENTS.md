# AGENTS.md

This file provides guidelines for AI agents working on the Shirugame codebase.

## Build/Run Commands

```bash
npm run dev          # Development server (with Socket.io)
npm run build        # Build for production
npm run build:socket # Build with Socket.io server
npm start            # Start production server
npm run start:socket # Start Socket.io server
npm run lint         # Lint code

# Database
npx prisma generate            # Generate Prisma client
npx prisma migrate dev --name # Create migration
```

**Note:** No test runner is configured. To add tests, use Vitest (recommended).

## Tech Stack

- **Framework:** Next.js 15+ with App Router
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4
- **UI:** shadcn/ui (New York style)
- **Database:** Prisma ORM
- **Auth:** Better Auth
- **State:** Zustand
- **Real-time:** Socket.io
- **Toast:** react-hot-toast

## Code Style

### Imports (order: React/Next → libs → aliases → relative)

```typescript
import * as React from "react";
import { useRouter } from "next/navigation";
import { create } from "zustand";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/shadcn-component/button";
import { useUser } from "@/stores/useUser";
import { cn } from "@/lib/utils";
```

### Path Aliases

- `@/*` → `./src/*`
- `@/components/*`, `@/lib/*`, `@/stores/*`, `@/hooks/*`, `@/types/*`, `@/utils/*`

### Naming

- **Components:** PascalCase (`Button.tsx`)
- **Hooks/Stores:** camelCase with `use` prefix (`useUser.ts`)
- **Types:** PascalCase (`User.ts`)
- **API Routes:** lowercase (`route.ts`)

### TypeScript

- Enable strict mode
- Define explicit return types for functions
- Use `type` for object shapes, `interface` for extensible contracts
- Prefer `undefined` over `null` for optional values

### Component Structure

```typescript
import * as React from "react";
import { cn } from "@/lib/utils";

type MyComponentProps = {
  className?: string;
  children: React.ReactNode;
};

export const MyComponent = ({ className, children }: MyComponentProps) => {
  return <div className={cn("base-classes", className)}>{children}</div>;
};
```

### API Routes

```typescript
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const data = await prisma.model.findMany();
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
};
```

### Error Handling

- Use try-catch in async functions
- Log errors with `console.error()`
- Return appropriate HTTP status codes
- Use `react-hot-toast` for user feedback

```typescript
toast.success("Operation completed");
const loadId = toast.loading("Loading...");
toast.success("Done", { id: loadId });
toast.error("Failed", { id: loadId });
```

### Styling

- Use `cn()` from `@/lib/utils` for conditional classes
- Follow shadcn/ui conventions
- Support dark mode with `dark:` prefix
- Use CSS variables from `globals.css`

### Zustand Store

```typescript
import { create } from "zustand";

type Store = { data: Type | null; setData: (data: Type) => void };

export const useStore = create<Store>((set) => ({
  data: null,
  setData: (data) => set({ data }),
}));
```

### Prisma

- Import from `@/lib/prisma` (singleton pattern)
- Run `prisma generate` after schema changes

## File Organization

```
src/
├── app/           # Next.js App Router (api/, page.tsx, layout.tsx)
├── components/    # UI components (ui/shadcn-component/, custom *.tsx)
├── hooks/         # Custom React hooks
├── lib/          # Core utilities (prisma, auth, etc.)
├── services/     # Business logic
├── stores/      # Zustand stores
├── types/        # TypeScript types
└── utils/        # Helper functions
```

## Environment Variables

- `DATABASE_URL` - Prisma database connection
- `NEXT_PUBLIC_APP_URL` - App URL
- Auth credentials (Better Auth)
- Socket.io configuration

## Common Tasks

```bash
npx shadcn add button      # Add shadcn component
npx prisma migrate dev    # Database migration
npx prisma generate       # Generate Prisma client
```
