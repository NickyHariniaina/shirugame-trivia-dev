"use client";
import { useForm } from "react-hook-form";
import { Input } from "../input";
import { User } from "@/types/db";
import { AddAndRemoveButton } from "../Button/AddAndRemoveButton";
import { useState } from "react";
import { Button } from "../button";
import { QuestionDisplayer } from "../QA/QuestionDisplayer";
import { Question } from "@/types/db";
import toast from "react-hot-toast";

type FormValues = {
  title: string;
  players: User[];
  numberOfQuestion: number;
};


export const RoomCreationBodyCard = () => {

  const [generatedQuestion, setGeneratedQuestion] = useState<Question[]>([]);

  const [numberOfQuestion, setNumberOfQuestion] = useState(1);
  const generateQuestions = async() => {
    try {
      // TODO: Create this func later
      const questions: Question[] = await generateQuestions(numberOfQuestion);
      setGeneratedQuestion(questions);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while generating questions, please try again later",
        { id: "generate-questions" });
    }
  }

  const { register } = useForm<FormValues>();
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col items-center gap-4">
          <Input
            placeholder="Choose a title"
            type="text"
            {...register("title")}
          />
          <div className="flex flex-col items-center justify-center gap-4">
            <p>Number of players</p>
            <div className="flex flex-row items-center gap-4">
              <div>{numberOfQuestion}</div>
              <AddAndRemoveButton setNumberOfQuestion={setNumberOfQuestion} />
            </div>
            <Button variant="secondary" onClick={generateQuestions}>Generate questions</Button>
            <QuestionDisplayer questions={generatedQuestion}/>
          </div>
        </div>
      </div>
    </div>
  );
};
