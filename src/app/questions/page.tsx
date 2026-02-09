"use client"
import FullScreenLoader from "@/components/ui/loading/fullscreen";
import { QuestionSearchBar } from "@/components/ui/search-bar/question-search-bar";
import { Button } from "@/components/ui/shadcn-component/button";
import { Textarea } from "@/components/ui/shadcn-component/textarea";
import { QuestionsTable } from "@/components/ui/tables/question-table";
import { authClient } from "@/lib/auth-client";
import { Question } from "@/types/db";
import { getAllQuestions, getMaxPage } from "@/utils/func";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const Page = () => {
    const { data: session, isPending } = authClient.useSession();
    const [showSubmitQuestion, setShowSubmitQuestion] = useState(false);
    const [maxPage, setMaxPage] = useState<number>(1);
    const [page, setPage] = useState(1);
    const [question, setQuestion] = useState("");
    const [loading, setLoading] = useState<boolean>(false);
    const [dispayledQuestions, setDispayledQuestions] = useState<Question[]>([]);
    const [answer, setAnswer] = useState("");
    const [searchValue, setSearchValue] = useState<string>("");

      useEffect(() => {
        const fetchQuestions = async () => {
            setLoading(true)
          const questions = await getAllQuestions(page, 10, searchValue);
          setQuestion(questions);
          const maxPage = await getMaxPage(page, 10, searchValue)
          setMaxPage(Math.round(maxPage));
          setLoading(false)
        };
        fetchQuestions();

      }, [page]);

    const handleGoSubmitButton = () => {
        if (!session) {
            toast.error("You need to log in to submit a question.");
            return;
        }
        setShowSubmitQuestion(prev => !prev);
    }

    const handleSearch = async () => {
        try {
            setLoading(true);
            const questions = await getAllQuestions(page, 10, searchValue);
            setDispayledQuestions(questions);
            setLoading(false);
            toast.success("Questions searched successfully!");
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong while searching questions.");
        }
    }

    if (isPending) return <FullScreenLoader />

    return <div className="flex flex-col gap-4 m-4 p-3 justify-center items-center">
        <h2 className="text-2xl font-bold">Shirugame&apos;s questions</h2>
        <Button variant="outline" onClick={handleGoSubmitButton} disabled>Go submit your own question</Button>
        <QuestionSearchBar searchValue={searchValue} setSearchValue={setSearchValue} handleSearch={handleSearch} />
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
        <QuestionsTable questions={dispayledQuestions} setQuestions={setDispayledQuestions} loading={loading} setLoading={setLoading} maxPage={maxPage} setMaxPage={setMaxPage}  page={page} setPage={setPage} />
    </div>
}

export default Page;
