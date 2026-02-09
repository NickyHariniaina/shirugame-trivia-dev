"use client"
import FullScreenLoader from "@/components/ui/loading/fullscreen";
import { Button } from "@/components/ui/shadcn-component/button";
import { Textarea } from "@/components/ui/shadcn-component/textarea";
import { QuestionsTable } from "@/components/ui/tables/question-table";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { toast } from "react-hot-toast";

const Page = () => {
    const { data: session, isPending } = authClient.useSession();
    const [showSubmitQuestion, setShowSubmitQuestion] = useState(false);
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");

    const handleGoSubmitButton = () => {
        if (!session) {
            toast.error("You need to log in to submit a question.");
            return;
        }
        setShowSubmitQuestion(prev => !prev);
    }

    if (isPending) return <FullScreenLoader />

    return <div className="flex flex-col gap-4 m-4 p-3 justify-center items-center">
        <h2 className="text-2xl font-bold">Shirugame&apos;s questions</h2>
        <Button variant="outline" onClick={handleGoSubmitButton} disabled>Go submit your own question</Button>
        {
            showSubmitQuestion && <div className="flex flex-col gap-2 p-5 border rounded-lg  w-full md:w-[600px]">
                <h3 className="text-xl font-semibold">Submit your question</h3>
                <Textarea placeholder="Your question" value={question} onChange={(e) => setQuestion(e.target.value)} />
                <Textarea placeholder="The answer of your question" value={answer} onChange={(e) => setAnswer(e.target.value)} />
                <p className="text-sm text-muted-foreground">Your questions will be sent to the Admin of Shirugame. Check your notifications for updates!</p>
                <Button variant="outline">Submit</Button>
                <Button variant="ghost" onClick={handleGoSubmitButton}>Cancel</Button>
            </div>
        }
        <QuestionsTable />
    </div>
}

export default Page;
