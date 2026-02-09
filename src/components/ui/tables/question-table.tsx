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
import { getAllQuestions, getMaxPage } from "@/utils/func";
import { Question } from "@/types/db";
import { ArrowLeft, ArrowRight, StepBack } from "lucide-react";
import { Button } from "../shadcn-component/button";
import { ModeToggle } from "../button/dark-mode-toggle";
import { Spinner } from "../shadcn-component/spinner";

type QuestionsTableProps = {
    questions: Question[]
    setQuestions: React.Dispatch<React.SetStateAction<Question[]>>
    loading: boolean
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    maxPage: number
    setMaxPage: React.Dispatch<React.SetStateAction<number>>
    page: number
    setPage: React.Dispatch<React.SetStateAction<number>>
}

export const QuestionsTable = (props: QuestionsTableProps) => {
  const router = useRouter();


  const handleNextPage = () => {
    props.setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (props.page > 1) {
      props.setPage((prevPage) => prevPage - 1);
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
      {props.loading? <div className="flex flex-row justify-center items-center p-5"><Spinner /></div> : <Table className="min-w-[400px] md:min-w-[600px] lg:min-w-[800px]">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[5%] text-left">Type</TableHead>
            <TableHead className="text-left w-[20%]">Question</TableHead>
            <TableHead className="text-left w-[10%]">Answer</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.questions.map((question: Question) => (
            <TableRow
              key={question.id}
            >
              <TableCell>{question.typeId}</TableCell>
              <TableCell>{question.question}</TableCell>
              <TableCell>{question.Answer}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>}
      <div className="flex flex-row justify-end gap-2 p-3 items-center">
        <p>{props.page}/{props.maxPage}</p>
        <Button onClick={handlePreviousPage} disabled={props.page === 1}>
            <ArrowLeft />
        </Button>
        <Button onClick={handleNextPage} disabled={props.page === props.maxPage}>
            <ArrowRight />
        </Button>
      </div>
    </div>
  );
};
