"use client";
import { Header } from "@/components/ui/header";
import { NotificationDisplayer } from "@/components/ui/notification-displayer";
import { authClient } from "@/lib/auth-client";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/shadcn-component/skeleton";

const Page = () => {
    const { data: session, isPending } = authClient.useSession();
    const [logged, setLogged] = useState<boolean>(false);
    useEffect(() => {
        if (!session) {
            setLogged(false);
        } else {
            setLogged(true);
        }
    }, [session, setLogged]);

    if (isPending) {
        return (
            <div className="flex flex-col m-2 gap-3">
                <Skeleton className="h-16 w-full" />
                <div className="flex flex-col gap-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Skeleton key={i} className="h-20 w-full" />
                    ))}
                </div>
            </div>
        );
    }
    return <div className="flex flex-col m-2 gap-3">
        <Header logged={logged} session={session} />
        <NotificationDisplayer session={session}/>
    </div>
}

export default Page
