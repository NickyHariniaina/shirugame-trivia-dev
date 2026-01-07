"use client";
import { FieldErrors, useForm } from "react-hook-form";
import { Input } from "../input";
import { User } from "@/types/db";
import { AddAndRemoveButton } from "../Button/AddAndRemoveButton";
import { useState } from "react";
import { Button } from "../button";
import { QuestionDisplayer } from "../QA/QuestionDisplayer";
import { Question } from "@/types/db";
import toast from "react-hot-toast";
import { createRoom, getQuestions } from "@/utils/func";
import { useRouter } from "next/navigation";
import { ChronoTimingSelector } from "./ChronoTimingSelector";

type FormValues = {
  title: string;
  players: User[];
  numberOfQuestion: number;
  chronoTiming: number;
};

export const RoomCreationBodyCard = () => {
  const [generatedQuestion, setGeneratedQuestion] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [numberOfQuestion, setNumberOfQuestion] = useState(1);
  const [chronoTiming, setChronoTiming] = useState(10);
  const [currentAnswer, setCurrentAnswer] = useState<FormValues>();
  const router = useRouter();

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

  const { handleSubmit, register, formState: { errors } } = useForm<FormValues>();

  const onInvalidSubmit = () => {
    const firstError = Object.values(errors)[0] as FieldErrors;
    if (firstError?.message) {
      toast.error("You must add a title", { id: "create-room-title-missing" });
    }
  }

  const createRoomHandler = async (data: FormValues) => {
    try {
      setLoading(true);
      if (generatedQuestion.length === 0) {
        toast.error("Please generate questions first", { id: "create-room" });
        setLoading(false);
        return;
      }
      const newData = { questions: generatedQuestion, ...data, chronoTiming: chronoTiming };
      await createRoom(newData);
      router.push("/room");
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(
        "Something went wrong while creating room, please try again later",
        { id: "create-room" },
      );
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col gap-4 mx-5">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col items-center gap-4">
          <Input
            placeholder="Choose a title"
            type="text"
            {...register("title" ,{required: "You must enter a title"})}
          />
          <ChronoTimingSelector setChronoTiming={setChronoTiming} chronoTiming={chronoTiming} />
          <div className="flex flex-col items-center justify-center gap-4">
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
        </div>
        <Button
          disabled={loading}
          onClick={handleSubmit(createRoomHandler, onInvalidSubmit)}
          variant="default"
        >
          Create
        </Button>
      </div>
    </div>
  );
};
