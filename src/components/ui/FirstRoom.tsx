"use client";
import { useForm } from "react-hook-form";
import { Input } from "./input";
import { Label } from "./label";
import { AddAndRemoveButton } from "./Button/AddAndRemoveButton";
import { useState } from "react";
import { Button } from "./button";
import { Spinner } from "./spinner";

type FormValues = {
  title: string;
  startDate: Date;
};

export const FirstRoom = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
  } = useForm<FormValues>();
  const [numberOfQuestion, setNumberOfQuestion] = useState(1);

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl">Let&apos;s start with your first room</h2>
      <form className="flex flex-col gap-4 items-center">
        <Label htmlFor="title">What&apos;s the title of your room?</Label>
        <Input
          type="text"
          className="text-center"
          {...register("title", { required: "Title is required" })}
        />
        <div className="flex flex-col items-center gap-4">
          <Label htmlFor="numberOfQuestion">
            How many questions do you want?
          </Label>
          <div className="flex flex-row items-center gap-4">
            <div>{numberOfQuestion}</div>
            <AddAndRemoveButton setNumberOfQuestion={setNumberOfQuestion} />
          </div>
        </div>
        <div className="flex flex-row items-center gap-4">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button onClick={handleSubmit(
            (data: FormValues) => {
              setLoading(true);
              console.log({numberOfQuestion, ...data});
              setTimeout(() => {
                console.log("timeout");
                setLoading(false);
              }, 1000);
            }
          )} type="submit" disabled={loading}>
            {loading ? <Spinner /> : "Create"}
          </Button>
        </div>
      </form>
    </div>
  );
};
