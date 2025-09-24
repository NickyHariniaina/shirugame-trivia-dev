import { Button } from "../button";
import { PiEyeSlashBold } from "react-icons/pi";
import { PiEyeLight } from "react-icons/pi";
type ShowPassButtonPropsType = {
  showPass: boolean;
  setShowPass: React.Dispatch<React.SetStateAction<boolean>>;
};
export const ShowPassButton = (props: ShowPassButtonPropsType) => { 
  const handleShowPass = () => {
    props.setShowPass(!props.showPass);
  }
  return <Button onClick={handleShowPass}>
    {props.showPass?
      <PiEyeLight />: <PiEyeSlashBold />
    }
  </Button>
};
