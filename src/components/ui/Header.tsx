import { Avatar } from "./Avatar";
import { Button } from "./button";

type HeaderPropsType = {
  looged: boolean;
};
export const Header = (props: HeaderPropsType) => {
  return (
    <div className="flex flex-row gap-3 p-2 justify-between items-center m-4 rounded-3xl hover:shadow-2xl  dark:hover:shadow-blue-900 transition-all duration-200 ease-in-out">
      <ul className=" flex lex-row items-center gap-3 p-1">
        <Button variant="ghost" type="button">
          Rooms
        </Button>
        <Button variant="ghost" type="button">
          Ranks
        </Button>
        <Button variant="ghost" type="button">
          Settings
        </Button>
      </ul>

      <div className="flex flex-row gap-3 p-2 items-center">
        <Avatar username="Nicky" />
      </div>
    </div>
  );
};
