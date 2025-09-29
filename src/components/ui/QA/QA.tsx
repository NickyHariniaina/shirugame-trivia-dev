import { Input } from "../input";

type QAPropsType = {
  question: string;
  answers: string[];
};

export const QA = ({ props }: QAPropsType) => {
  return (
    <div className="flex flex-col gap-3 justify-center items-center">
      <p>{props.question}</p>
      <ul className="flex flex-col gap-3 items-start">
        {props.answers.map((anwser: string) => {
          <Input type="checkbox" />;
        })}
      </ul>
    </div>
  );
};
