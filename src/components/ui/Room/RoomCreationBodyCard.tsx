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
import { getQuestions } from "@/utils/func";

type FormValues = {
  title: string;
  players: User[];
  numberOfQuestion: number;
};

export const RoomCreationBodyCard = () => {
  const [generatedQuestion, setGeneratedQuestion] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [numberOfQuestion, setNumberOfQuestion] = useState(1);
  const generateQuestionsHandler = async () => {
    try {
      setLoading(true);
      const questions: Question[] = await getQuestions(numberOfQuestion);
      setGeneratedQuestion(questions);
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

  const { handleSubmit ,register } = useForm<FormValues>();

  const createRoomHandler = async (data: FormValues) => {
    try {
      const newData = {questions: generatedQuestion ,...data}
      console.log(newData)
    } catch (error) {
      console.log(error);
      toast.error(
        "Something went wrong while creating room, please try again later",
        { id: "create-room" },
      );
    }
  };
  return (
    <div className="flex flex-col gap-4 mx-5">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col items-center gap-4">
          <Input
            placeholder="Choose a title"
            type="text"
            {...register("title")}
          />
          <div className="flex flex-col items-center justify-center gap-4">
            <p>Limit number of players</p>
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
            <QuestionDisplayer loading={loading} questions={generatedQuestion} />
          </div>
        </div>
        <Button variant='default' onClick={handleSubmit(createRoomHandler)} disabled={loading}>Create</Button>
      </div>
    </div>
  );
};
