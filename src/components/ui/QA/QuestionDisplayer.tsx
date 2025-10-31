import { Question } from "@/types/db";
import { ScrollArea } from "../scroll-area";
import { Spinner } from "../spinner";

type QuestionDisplayerProps = {
  questions: Question[];
  loading: boolean;
};

export const QuestionDisplayer = (props: QuestionDisplayerProps) => {
  const questions: string[] = props.questions.map((question: Question) => {
    return question.question;
  });
  // TODO: Add fallback for empty questions
  return (
<ScrollArea className="w-full h-40 rounded-md border p-4">
  {props.loading ? (
    <div className="flex h-full w-full items-center justify-center">
      <Spinner />
    </div>
  ) : (
    <div className="flex flex-col items-center gap-3">
      {questions.map((question, index) => (
        <div key={index} className="flex flex-col gap-2 w-full">
          <p className="py-4 border-y">{question}</p>
        </div>
      ))}
    </div>
  )}
</ScrollArea>
  );
};
