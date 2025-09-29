import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { QA } from "./QA/QA";

type QAPropsType = {
  question: string;
  answers: string[];
};

export function CarouselDemo() {
  const questions: QAPropsType[] = [
    {
      question: "Which of the following is NOT a JavaScript framework?",
      answers: ["React", "Vue", "Angular", "Laravel"],
    },
    {
      question: "What does CSS stand for?",
      answers: [
        "Cascading Style Sheets",
        "Computer Style Syntax",
        "Creative Styling System",
        "Colorful Style Sheets",
      ],
    },
    {
      question: "Which method is used to parse JSON in JavaScript?",
      answers: [
        "JSON.parse()",
        "JSON.stringify()",
        "JSON.toObject()",
        "JSON.convert()",
      ],
    },
    {
      question: "What is the command to initialize a Git repository?",
      answers: ["git init", "git start", "git create", "git new"],
    },
    {
      question:
        "Which HTTP method is typically used to update data on a server?",
      answers: ["PUT", "GET", "DELETE", "CONNECT"],
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
      <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2" />
      <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2" />
    </Carousel>
  );
}
