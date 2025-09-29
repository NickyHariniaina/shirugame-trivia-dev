import { Button } from "../button";

type QAPropsType = {
  question: string;
  answers: string[];
};

export const QA = ({ props }: QAPropsType) => {
  return (
    <form className="flex flex-col gap-3 justify-center items-center">
      <p>{props.question}</p>
      <ul className="flex flex-col gap-3 items-start">
        {props.answers.map((anwser: string) => {})}
      </ul>
      <Button type="button"></Button>
    </form>
  );
};
