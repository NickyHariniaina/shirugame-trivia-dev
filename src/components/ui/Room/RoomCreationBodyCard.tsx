"use client";
import { useForm } from "react-hook-form";
import { Input } from "../input";
import { User } from "@/types/db";
import { AddAndRemoveButton } from "../Button/AddAndRemoveButton";
import { useState } from "react";
import { Button } from "../button";
import { QuestionDisplayer } from "../QA/QuestionDisplayer";
type FormValues = {
  title: string;
  players: User[];
  numberOfQuestion: number;
};

export const RoomCreationBodyCard = () => {
  const [numberOfQuestion, setNumberOfQuestion] = useState(1);
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
            <Button variant="secondary">Generate questions</Button>
            <QuestionDisplayer numberOfQuestion={numberOfQuestion} />
          </div>
        </div>
      </div>
    </div>
  );
};
