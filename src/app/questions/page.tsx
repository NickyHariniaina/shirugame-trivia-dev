/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import FullScreenLoader from "@/components/ui/loading/fullscreen";
import { FilterSelector } from "@/components/ui/room/filter-selector";
import { useForm } from "react-hook-form";
import { QuestionSearchBar } from "@/components/ui/search-bar/question-search-bar";
import { Button } from "@/components/ui/shadcn-component/button";
import { Textarea } from "@/components/ui/shadcn-component/textarea";
import { QuestionsTable } from "@/components/ui/tables/question-table";
import { authClient } from "@/lib/auth-client";
import { Question } from "@/types/db";
import { getAllQuestions, getMaxPage, paginate } from "@/utils/func";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

type QuestionForm = {
    question: string;
    answer: string;
};

const Page = () => {
    const { data: session, isPending } = authClient.useSession();
    const [paginateQuestions, setPaginateQuestions] = useState<Question[]>([]);
    const [showSubmitQuestion, setShowSubmitQuestion] = useState(false);
    const [maxPage, setMaxPage] = useState<number>(1);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [fetchedQuestions, setFetchedQuestions] = useState<Question[]>(
        [],
    );
    const [typeId, setTypeId] = useState<string>("null");
    const [searchValue, setSearchValue] = useState<string>("");
    const {
        register,
        handleSubmit,
        reset,
        formState: { isSubmitting },
    } = useForm<QuestionForm>();

    const onSubmitQuestion = async (data: QuestionForm) => {
        if (!session) {
            toast.error("You need to log in to submit a question.");
            return;
        }
        try {
            setLoading(true);
            await fetch("/api/questions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...data,
                    score: 0,
                    isValidated: false,
                    userId: session.user.id,
                }),
            });
            toast.success(
                "Question sent to the admin!, check your notifications for updates!",
            );
            reset();
            setShowSubmitQuestion(false);
        } catch (e) {
            toast.error("Failed to submit question");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchQuestions = async () => {
            const questions = await getAllQuestions(
                searchValue,
                typeId,
            );
            setFetchedQuestions(questions);
            const maxPage = await getMaxPage(questions ,page, 10);
            setMaxPage(Math.round(maxPage));
            setPaginateQuestions(paginate(questions, page, 10));
        };
        fetchQuestions();
    }, [typeId]);

    useEffect(() => {
        setPaginateQuestions(paginate(fetchedQuestions, page, 10));
    }, [page]);

    const handleGoSubmitButton = () => {
        if (!session) {
            toast.error("You need to log in to submit a question.");
            return;
        }
        setShowSubmitQuestion((prev) => !prev);
    };

    const handleSearch = async () => {
        try {
            setLoading(true);
            setPage(1);
            const questions = await getAllQuestions(
                searchValue,
                typeId,
            );
            setFetchedQuestions(questions);
            const maxPage = await getMaxPage(questions, page, 10);
            setMaxPage(Math.round(maxPage));
            setLoading(false);
            setPaginateQuestions(paginate(questions, page, 10));
            toast.success("Questions searched successfully!");
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong while searching questions.");
        }
    };

    const handleClearValue = () => {
        setSearchValue("");
    };

    if (isPending) return <FullScreenLoader />;

    return (
        <div className="flex flex-col gap-4 m-4 p-3 justify-center items-center">
            <h2 className="text-2xl font-bold">Shirugame&apos;s questions</h2>
            <Button variant="outline" onClick={handleGoSubmitButton}>
                Go submit your own question
            </Button>
            {showSubmitQuestion && (
                <form
                    onSubmit={handleSubmit(onSubmitQuestion)}
                    className="flex flex-col gap-2 p-5 border rounded-lg w-full md:w-[600px]"
                >
                    <h3 className="text-xl font-semibold">
                        Submit your question
                    </h3>

                    <Textarea
                        placeholder="Your question"
                        {...register("question", {
                            required: true,
                            minLength: 5,
                        })}
                    />

                    <Textarea
                        placeholder="The answer of your question"
                        {...register("answer", {
                            required: true,
                            minLength: 2,
                        })}
                    />

                    <p className="text-sm text-muted-foreground">
                        Your questions will be sent to the Admin of Shirugame.
                    </p>

                    <Button
                        type="submit"
                        variant="outline"
                        disabled={isSubmitting}
                    >
                        Submit
                    </Button>

                    <Button
                        type="button"
                        variant="ghost"
                        onClick={handleGoSubmitButton}
                    >
                        Cancel
                    </Button>
                </form>
            )}
            <FilterSelector setTypeId={setTypeId} typeId={typeId} />
            <QuestionSearchBar
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                handleSearch={handleSearch}
                handleClearValue={handleClearValue}
            />
            <QuestionsTable
                questions={paginateQuestions}
                loading={loading}
                maxPage={maxPage}
                page={page}
                setPageAction={setPage}
            />
        </div>
    );
};

export default Page;
