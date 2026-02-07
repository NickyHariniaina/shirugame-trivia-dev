import { Table } from "lucide-react"
import router from "next/router"
import { Avatar } from "../profil/avatar"
import { TableHeader, TableRow, TableHead, TableBody, TableCell } from "../shadcn-component/table"
import { useEffect, useState } from "react"
import { getAllQuestions } from "@/utils/func"
import { Question } from "@/types/db"

export const QuestionsTable = () => {

    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const fetchQuestions = async () => {
            const questions = await getAllQuestions(1, 10);
            setQuestions(questions);
        }
        fetchQuestions();
    }, [])

    return <div className="shadow-2xl dark:shadow-blue-700 max-w-full overflow-x-hidden border rounded-lg">
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
              onClick={() => router.push(`/question/${question.id}`)}
            >
              <TableCell>{question.type.name}</TableCell>
              <TableCell>{question.question}</TableCell>
              <TableCell>{question.Answer}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
}