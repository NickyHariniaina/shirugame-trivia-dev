import { MinusIcon, PlusIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"

type AddAndRemoveButtonProps = {
  setNumberOfQuestion: React.Dispatch<React.SetStateAction<number>>;
};
export const AddAndRemoveButton = (props: AddAndRemoveButtonProps) => {
  return (
    <ButtonGroup
      orientation="vertical"
      aria-label="Media controls"
      className="h-fit"
    >
      <Button onClick={() => props.setNumberOfQuestion((e: number) => {
        return e != 40? e + 1 : e;
      })} variant="outline" size="icon" type="button">
        <PlusIcon />
      </Button>
      <Button type="button" variant="outline" size="icon" onClick={() => props.setNumberOfQuestion((e: number) => {
        return e != 1? e - 1 : e;
      })}>
        <MinusIcon />
      </Button>
    </ButtonGroup>
  )
}
