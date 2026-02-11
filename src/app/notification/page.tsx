"use client";
import { Header } from "@/components/ui/header";
import FullScreenLoader from "@/components/ui/loading/fullscreen";
import { authClient } from "@/lib/auth-client";
import { useState, useEffect } from "react";

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

    if (isPending) return <FullScreenLoader />;
    return <div>
        <Header logged={logged} session={session} />
    </div>
}

export default Page
