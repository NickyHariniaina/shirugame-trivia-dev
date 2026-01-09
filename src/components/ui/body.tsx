import { motion } from "motion/react";
import { Button } from "./shadcn-component/button";
import { CarouselDemo } from "./carousel-template";
import { Separator } from "./shadcn-component/separator";
import { UserHistory } from "./user-history";
import { useRouter } from "next/navigation";
type BodyPropsType = {
  logged: boolean;
};
export const Body = (props: BodyPropsType) => {

  const router = useRouter();

  const handleStart = () => {
    if (props.logged) {
      router.push("/room/create")
    } else {
      router.push("/auth/sign-up");
    }
  }

  const handlePlaySingleMode = () => {
    router.push("/single-player");
  }

  return (
    <div className="w-[100%] flex flex-col gap-4 justify-center items-center">
      <motion.h1
        className="cursor-pointer text-4xl sm:text-5xl mb-2 md:text-6xl lg:text-7xl xl:text-8xl"
        whileHover={{ scale: 1.4 }}
      >
        Shirugame
      </motion.h1>
      <p className="m-4 text-center animate">
        Ready to use your brain with Shirugame ? Create a room, share the link,
        and outsmart everyone else !
      </p>
      <Button variant="secondary" onClick={handlePlaySingleMode}>
        Play ( Single player mode )
      </Button>
      <Button onClick={handleStart} variant="default">
        {props.logged ? "Create room" : "Get started"}
      </Button>
      <Separator className="m-4" />
      {!props.logged ? <CarouselDemo /> : <UserHistory />}
    </div>
  );
};
