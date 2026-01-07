import { Button } from "../button";
import { CustomCheckbox } from "../CheckboxCustomized";

type QAPropsType = {
  question: string;
  answers: string[];
};

export const QA = (props: QAPropsType) => {
  return (
    <form
      className="flex flex-col gap-4
                     max-w-lg w-full
                     mx-auto px-4 sm:px-6 lg:px-0"
    >
      <p className="text-lg text-center font-medium">{props.question}</p>
      <ul className="flex flex-col gap-3">
        {props.answers.map((answer: string, id) => (
          <CustomCheckbox key={id} answer={answer} />
        ))}
      </ul>
      <Button type="button" className="self-center">
        Submit
      </Button>
    </form>
  );
};
