"use client";
import { updateUserScore } from "@/utils/func";
import { Badge } from "../badge";
import { authClient } from "@/lib/auth-client";

import { Room } from "@/types/db";
import { Checkbox } from "../checkbox"; // shadcn
import { Label } from "../label";
import { Separator } from "../separator";
import { Button } from "../button";
import { useEffect, useState } from "react";
import { getRandomAnswer as getRandomAnswerApi, shuffleArray } from "@/utils/func";

type GameSectionProps = {
  room: Room | undefined;
};

export const GameSection = ({ room }: GameSectionProps) => {
  const { data: session } = authClient.useSession();
  const [showScore, setShowScore] = useState(false);
  const [currentQuestionCount, setCurrentQuestionCount] = useState(0);
  const [checkedAnswer, setCheckedAnswer] = useState<string[]>([]);
  const [randomAnswer, setRandomAnswer] = useState<string[]>([]);
  const [currentScore, setCurrentScore] = useState(0);

  useEffect(() => {
    if (!room) return;
    const question = room.questions[currentQuestionCount];
    if (!question) return;

    const fetchRandomAnswer = async () => {
      setRandomAnswer([]);
      setCheckedAnswer([]); // reset checked answers for new question
      const wrongAnswers = await getRandomAnswerApi();

      const answers: string[] = shuffleArray([
        question.Answer,
        ...wrongAnswers.map((a) => a.Answer),
      ]);

      setRandomAnswer(answers);
    };

    fetchRandomAnswer();
  }, [currentQuestionCount, room]);

  if (!room || !room.questions[currentQuestionCount]) {
    return null;
  }

  const question = room.questions[currentQuestionCount];
  console.log(question);

  const handleSubmit = async () => {
    if (checkedAnswer.length === 1 && checkedAnswer[0] === question.Answer) {
      setCurrentScore((prev) => prev + question.Score);
    }

    if (currentQuestionCount < room.questions.length - 1) {
      setCurrentQuestionCount((prev) => prev + 1);
    } else {
      await updateUserScore(currentScore, session?.data?.user.id || "");
      setShowScore(true);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-center">{room.title}</h2>

      <Separator />

      <form
        className="flex flex-col gap-4 justify-center items-center"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className="flex flex-col gap-2">
          <Badge variant="outline" className="self-center">
            {question.typeId.split("-")[1].toUpperCase()}
          </Badge>
          <p className="text-lg text-center font-medium">{question.question}</p>
        </div>

        <ul className="flex flex-col gap-3">
          {randomAnswer.map((answer: string, id) => (
            <div className="flex items-center gap-3" key={id}>
              <Checkbox
                id={String(id)}
                checked={checkedAnswer.includes(answer)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setCheckedAnswer((prev) => [...prev, answer]);
                  } else {
                    setCheckedAnswer((prev) => prev.filter((a) => a !== answer));
                  }
                }}
              />
              <Label htmlFor={String(id)} className="text-md">
                {answer}
              </Label>
            </div>
          ))}
        </ul>

        <Button type="submit" className="self-center">
          Submit
        </Button>
        <Button
          onClick={() => setCurrentQuestionCount((p) => p + 1)}
          disabled={currentQuestionCount === room.questions.length - 1}
        >
          Next question
        </Button>
      </form>

      <p className="text-center mt-2" hidden={!showScore}>
        Thanks for playing! Your score is {currentScore}pts... we will update your ranking soon.
        <br />
        Go to your profile to see update your ranking.
      </p>

    </div>
  );
};
