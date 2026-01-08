import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/shadcn-component/carousel";
import { QA } from "./question-answer/question-answer-";

type QAPropsType = {
  question: string;
  answers: string[];
};

export function CarouselDemo() {
  const questions: QAPropsType[] = [
    {
      question: "Which of these JavaScript concepts is NOT part of ES6?",
      answers: [
        "Promises",
        "Arrow Functions",
        "Generators",
        "Prototype Chains",
      ],
    },
    {
      question: "In CSS, what does the `clamp()` function do?",
      answers: [
        "Restricts a value between a min and max",
        "Rounds pixel values",
        "Applies a CSS transition",
        "Defines a grid template",
      ],
    },
    {
      question:
        "Which array method creates a new array with the results of calling a provided function on every element?",
      answers: ["map()", "forEach()", "filter()", "reduce()"],
    },
    {
      question: "In Git, what does `git rebase` do?",
      answers: [
        "Re-applies commits on top of another base commit",
        "Deletes the repository",
        "Creates a new branch",
        "Merges two branches automatically",
      ],
    },
    {
      question:
        "Which HTTP status code indicates a resource has been permanently moved?",
      answers: ["301", "302", "404", "500"],
    },
  ];

  return (
    <Carousel className="w-full">
      <CarouselContent>
        {questions.map((q, index) => (
          <CarouselItem key={index}>
            <QA question={q.question} answers={q.answers} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className=" absolute left-0 top-1/2 transform -translate-y-1/2" />
      <CarouselNext className=" absolute right-0 top-1/2 transform -translate-y-1/2" />
    </Carousel>
  );
}
