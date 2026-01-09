"use client"
import { getRandomAnswer as getRandomAnswerApi, shuffleArray } from "@/utils/func";
import { useEffect } from "react";
import { Badge } from "../shadcn-component/badge";
import { Label } from "../shadcn-component/label";
import { Resume } from "./resume";
import { FilterSelector } from "./filter-selector";
import { Checkbox } from "../shadcn-component/checkbox";
import { Button } from "../shadcn-component/button";
import { toast } from "react-hot-toast";
import { QuestionDisplayer } from "../question-answer/question-displayer";
import { Question } from "@/types/db";
import { useState } from "react";
import { AddAndRemoveButton } from "../button/add-and-remove-button";
import { getQuestions  } from "@/utils/func";

type MyAnswersVSTheAnswers = { myAnswers: string[], theAnswers: string[], questions: string[] };

export const SinglePlayerMode = () => {
  const [startGame, setStartGame] = useState(false);
  const [typeId, setTypeId] = useState<string>("null");
  const [generatedQuestion, setGeneratedQuestion] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [numberOfQuestion, setNumberOfQuestion] = useState(1);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [currentQuestionCount, setCurrentQuestionCount] = useState(0);
  const [checkedAnswer, setCheckedAnswer] = useState<string[]>([]);
  const [randomAnswer, setRandomAnswer] = useState<string[]>([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [myAnswers, setMyAnswers] = useState<MyAnswersVSTheAnswers>({ myAnswers: [], theAnswers: [], questions: [] });


  useEffect(() => {
    const question = generatedQuestion[currentQuestionCount];
    if (!question) return;

    const fetchRandomAnswer = async () => {
      setRandomAnswer([]);
      setCheckedAnswer([]);
      const wrongAnswers = await getRandomAnswerApi();

      const answers: string[] = shuffleArray([
        question.Answer,
        ...wrongAnswers.map((a: { Answer: string }) => a.Answer),
      ]);

      setRandomAnswer(answers);
    };

    fetchRandomAnswer();
  }, [currentQuestionCount, startGame]);


  const generateQuestionsHandler = async () => {
    try {
      setLoading(true);
      const questions: Question[] = await getQuestions(numberOfQuestion, typeId);
      setGeneratedQuestion(questions);
      setMyAnswers({ myAnswers: [], theAnswers: [], questions: questions.map((q: Question) => q.question) });
    } catch (error) {
      console.log(error);
      toast.error(
        "Something went wrong while generating questions, please try again later",
        { id: "generate-questions" },
      );
    } finally {
      setLoading(false);
    }
  };

  const question = generatedQuestion[currentQuestionCount];

  const handleSubmit = async () => {
    if (checkedAnswer.length === 1 && checkedAnswer[0] === question.Answer) {
      setCurrentScore((prev) => prev + question.Score);
      toast.success("Correct answer!");
    } else {
      toast.error("Wrong answer!");
    }

    let myCurrentAnswers: string = "NO ANSWER";

    if (checkedAnswer.length !== 0) {
      myCurrentAnswers = checkedAnswer[0];
    }

    setMyAnswers((prev) =>
      ({ myAnswers: [...prev.myAnswers, myCurrentAnswers],
        theAnswers: [...prev.theAnswers, question.Answer], questions: prev.questions })
    );

    if (currentQuestionCount < generatedQuestion.length - 1) {
      setCurrentQuestionCount((prev) => prev + 1);
    } else {
      toast.success(`Thanks for playing! Your score is ${currentScore}pts... we will update your ranking soon.`);
      setIsGameFinished(true);
    }
  };

  return <div className="flex flex-col gap-4 items-center p-3">
    <h2 className="text-2xl font-bold text-center">Single player mode</h2>

    { !startGame ? <FilterSelector setTypeId={setTypeId} typeId={typeId}  />: null}
    <div className="flex flex-col items-center justify-center gap-4" hidden={startGame}>
      <p>Number of questions</p>
      <div className="flex flex-row items-center gap-4">
        <div>{numberOfQuestion}</div>
        <AddAndRemoveButton setNumberOfQuestion={setNumberOfQuestion} />
      </div>
      <Button
        variant="secondary"
        disabled={loading}
        onClick={generateQuestionsHandler}
      >
        Generate questions
      </Button>
      <QuestionDisplayer
        loading={loading}
        questions={generatedQuestion}
      />
    </div>

    <Button onClick={() => setStartGame(true)} variant="default" hidden={startGame} disabled={generatedQuestion.length === 0}>
      Start
    </Button>

    {startGame ? <form
        className="flex flex-col gap-4 justify-center items-center"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        hidden={isGameFinished}
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
          disabled={currentQuestionCount === generatedQuestion.length - 1}
        >
          Next question
        </Button>
      </form>: null}

      { isGameFinished ? <Resume myAnswers={myAnswers.myAnswers} theAnswers={myAnswers.theAnswers} questions={myAnswers.questions}/> : null }
  </div>
}
