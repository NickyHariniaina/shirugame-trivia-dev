"use client";
import { Body } from "@/components/ui/body";
import { Footer } from "@/components/ui/footer";
import { Header } from "@/components/ui/header";
import { authClient } from "@/lib/auth-client";
import { useUser } from "@/stores/useUser";
import { useState, useEffect } from "react";
import { useSocketStore } from "@/stores/useSocketStore";
import { Skeleton } from "@/components/ui/shadcn-component/skeleton";

const Page = () => {
    const [logged, setLogged] = useState<boolean>(false);
    const { data: session, isPending } = authClient.useSession();
    const { connect } = useSocketStore();
    const { setUserData } = useUser();

    useEffect(() => {
        if (!session) {
            setLogged(false);
        } else {
            connect(session?.user?.id);
            setLogged(true);
            setUserData(session?.user);
        }
    }, [session, setUserData, connect]);

    if (isPending) {
        return (
            <div className="flex flex-col m-2 gap-3">
                <Skeleton className="h-16 w-full" />
                <div className="flex flex-col gap-4 p-4">
                    <Skeleton className="h-48 w-full" />
                    <Skeleton className="h-32 w-full" />
                </div>
                <Skeleton className="h-12 w-full" />
            </div>
        );
    }

    return (
        <div className="flex flex-col m-2 gap-3">
            <Header logged={logged} session={session} />
            <Body logged={logged} />
            <Footer />
        </div>
    );
};

export default Page;
