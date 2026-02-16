'use client';

import { useEffect, useState } from "react";
import { Header } from "@/components/ui/header";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/shadcn-component/button";
import { Badge } from "@/components/ui/shadcn-component/badge";
import { Check, X, Loader2 } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/shadcn-component/select";
import toast from "react-hot-toast";
import FullScreenLoader from "@/components/ui/loading/fullscreen";
import { YouNeedAnAccount } from "@/components/ui/chore-component/you-need-an-account";
import Link from "next/link";

interface QuestionType {
    id: string;
    name: string;
}

interface PendingQuestion {
    id: string;
    question: string;
    Score: number;
    Answer: string;
    isValidated: boolean;
    typeId: string | null;
    user?: {
        id: string;
        name: string;
        username: string | null;
    };
    type?: {
        id: string;
        name: string;
    };
}

const Page = () => {
    const { data: session, isPending: sessionPending } = authClient.useSession();
    const [questions, setQuestions] = useState<PendingQuestion[]>([]);
    const [types, setTypes] = useState<QuestionType[]>([]);
    const [loading, setLoading] = useState(true);
    const [processingId, setProcessingId] = useState<string | null>(null);
    const [questionScores, setQuestionScores] = useState<Record<string, number>>({});
    const [questionTypes, setQuestionTypes] = useState<Record<string, string>>({});

    useEffect(() => {
        if (session?.user.role === "admin") {
            fetchPendingQuestions();
            fetchTypes();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session]);

    const fetchPendingQuestions = async () => {
        try {
            const res = await fetch("/api/admin/questions/pending");
            const data = await res.json();
            if (res.ok) {
                const questionsData = data.data || [];
                setQuestions(questionsData);
                const initialScores: Record<string, number> = {};
                const initialTypes: Record<string, string> = {};
                questionsData.forEach((q: PendingQuestion) => {
                    initialScores[q.id] = q.Score || 10;
                    initialTypes[q.id] = q.typeId || "";
                });
                setQuestionScores(initialScores);
                setQuestionTypes(initialTypes);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch questions");
        } finally {
            setLoading(false);
        }
    };

    const fetchTypes = async () => {
        try {
            const res = await fetch("/api/types");
            const data = await res.json();
            if (res.ok) {
                setTypes(data.data || []);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleScoreChange = (questionId: string, value: string) => {
        const score = parseInt(value) || 0;
        setQuestionScores((prev) => ({ ...prev, [questionId]: score }));
    };

    const handleTypeChange = (questionId: string, value: string) => {
        setQuestionTypes((prev) => ({ ...prev, [questionId]: value }));
    };

    const handleValidate = async (questionId: string, isValidated: boolean) => {
        setProcessingId(questionId);
        try {
            const res = await fetch(`/api/admin/questions/${questionId}/validate`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    isValidated,
                    score: questionScores[questionId],
                    typeId: questionTypes[questionId],
                }),
            });

            if (res.ok) {
                toast.success(isValidated ? "Question approved" : "Question rejected");
                setQuestions((prev) => prev.filter((q) => q.id !== questionId));
            } else {
                toast.error("Failed to validate question");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to validate question");
        } finally {
            setProcessingId(null);
        }
    };

    if (sessionPending) return <FullScreenLoader />;
    if (!session) return <YouNeedAnAccount />;
    if (session.user.role !== "admin") {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <h2 className="text-2xl font-bold">Access Denied</h2>
                <p>You do not have permission to view this page.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <Header logged={true} session={session} />

            <div className="container mx-auto p-4 max-w-4xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-bold">Question Moderation</h2>
                        <p className="text-muted-foreground text-sm sm:text-base">
                            Review and validate user-submitted questions
                        </p>
                    </div>
                    <Link href="/setting">
                        <Button variant="outline" size="sm">Back</Button>
                    </Link>
                </div>

                {loading ? (
                    <div className="flex justify-center p-8">
                        <Loader2 className="h-8 w-8 animate-spin" />
                    </div>
                ) : questions.length === 0 ? (
                    <div className="border rounded-lg p-6 sm:p-8 flex flex-col items-center justify-center">
                        <p className="text-muted-foreground text-lg">No pending questions</p>
                        <p className="text-sm text-muted-foreground">
                            All questions have been reviewed
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                            {questions.length} pending question{questions.length !== 1 ? "s" : ""}
                        </p>
                        {questions.map((question) => (
                            <div key={question.id} className="border rounded-lg p-3 sm:p-4">
                                <div className="flex flex-col gap-3">
                                    <div>
                                        <h3 className="text-base sm:text-lg font-semibold break-words">
                                            {question.question}
                                        </h3>
                                        <div className="flex gap-2 mt-2 flex-wrap">
                                            {question.type && (
                                                <Badge variant="outline" className="text-xs">
                                                    {question.type.name}
                                                </Badge>
                                            )}
                                            {question.user && (
                                                <Badge variant="outline" className="text-xs">
                                                    By: {question.user.username || question.user.name}
                                                </Badge>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <div className="bg-muted p-2 rounded text-sm break-words flex-1">
                                            <span className="font-medium">Answer: </span>
                                            <span>{question.Answer}</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <div className="flex flex-col gap-1">
                                            <label htmlFor={`score-${question.id}`} className="text-xs font-medium">Score</label>
                                            <input
                                                id={`score-${question.id}`}
                                                type="number"
                                                min="1"
                                                max="100"
                                                value={questionScores[question.id] || 10}
                                                onChange={(e) => handleScoreChange(question.id, e.target.value)}
                                                className="border rounded px-2 py-1 text-sm w-24"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1 flex-1">
                                            <label htmlFor={`type-${question.id}`} className="text-xs font-medium">Type</label>
                                            <Select
                                                value={questionTypes[question.id] || ""}
                                                onValueChange={(value) => handleTypeChange(question.id, value)}
                                            >
                                                <SelectTrigger id={`type-${question.id}`} className="w-full">
                                                    <SelectValue placeholder="Select type..." />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {types.map((type) => (
                                                        <SelectItem key={type.id} value={type.id}>
                                                            {type.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                                        <div className="text-xs text-muted-foreground">
                                            Current: Score {question.Score}
                                        </div>
                                        <div className="flex gap-2 w-full sm:w-auto">
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                className="flex-1 sm:flex-initial"
                                                onClick={() => handleValidate(question.id, false)}
                                                disabled={processingId === question.id}
                                            >
                                                {processingId === question.id ? (
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                ) : (
                                                    <X className="h-4 w-4" />
                                                )}
                                                <span className="ml-1 sm:hidden">Reject</span>
                                            </Button>
                                            <Button
                                                variant="default"
                                                size="sm"
                                                className="flex-1 sm:flex-initial"
                                                onClick={() => handleValidate(question.id, true)}
                                                disabled={processingId === question.id || !questionTypes[question.id]}
                                            >
                                                {processingId === question.id ? (
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                ) : (
                                                    <Check className="h-4 w-4" />
                                                )}
                                                <span className="ml-1 sm:hidden">Approve</span>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Page;
