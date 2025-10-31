import { Question } from "@/types/db";
import { ScrollArea } from "../scroll-area";
import { Spinner } from "../spinner";

type QuestionDisplayerProps = {
  questions: Question[];
  loading: boolean;
};

export const QuestionDisplayer = (props:  QuestionDisplayerProps) => {

  const questions: string[] = props.questions.map((question: Question) => {
    return question.question;
  });

  return <ScrollArea className="flex flex-col w-[75%] gap-3 rounded-md border p-4 h-40">
    {
      props.loading ? <Spinner /> :questions.map((question, index) => {
        return <div key={index} className="flex flex-col gap-2">
          <p className='py-4 border-y'>{question}</p>
        </div>
      })

  }
  </ScrollArea>
}
