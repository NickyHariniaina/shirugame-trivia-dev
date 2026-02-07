"use client";
import { useRouter } from "next/navigation";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../shadcn-component/table";
import { useEffect, useState } from "react";
import { getAllQuestions, getQuestionsPageLeft } from "@/utils/func";
import { Question } from "@/types/db";
import { ArrowLeft, ArrowRight, StepBack } from "lucide-react";
import { Button } from "../shadcn-component/button";
import { ModeToggle } from "../button/dark-mode-toggle";

export const QuestionsTable = () => {
  const [questions, setQuestions] = useState([]);
  const [pageLeft, setPageLeft] = useState(0);
  const [page, setPage] = useState(1);
  const router = useRouter();

  useEffect(() => {
    const fetchQuestions = async () => {
      const questions = await getAllQuestions(page, 10);
      setQuestions(questions);
      const pageLeft = await getQuestionsPageLeft(page, 10)
      setPageLeft(pageLeft);
    };
    fetchQuestions();
    
  }, [page]);

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="shadow-2xl dark:shadow-blue-700 max-w-full overflow-x-hidden border rounded-lg">
      <div className="flex flex-row gap-2 p-3">
        <Button
          onClick={() => router.push("/")}
          variant="ghost"
          className="p-2 md:p-3"
        >
          <StepBack className="w-5 h-5 md:w-6 md:h-6" />
        </Button>
        <ModeToggle />
      </div>
      <Table className="min-w-[400px] md:min-w-[600px] lg:min-w-[800px]">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[5%] text-left">Type</TableHead>
            <TableHead className="text-left w-[20%]">Question</TableHead>
            <TableHead className="text-left w-[10%]">Answer</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {questions.map((question: Question) => (
            <TableRow
              key={question.id}
            >
              <TableCell>{question.typeId}</TableCell>
              <TableCell>{question.question}</TableCell>
              <TableCell>{question.Answer}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex flex-row justify-end gap-2 p-3">
        <p>Page {page}</p>
        <Button onClick={handlePreviousPage} disabled={page === 1}>
            <ArrowLeft />
        </Button>
        <Button onClick={handleNextPage}>
            <ArrowRight />
        </Button>
      </div>
    </div>
  );
};
