import { motion } from "motion/react";
import { Button } from "./button";
import { CarouselDemo } from "./CarouselTemplate";
import { Separator } from "./separator";

type BodyPropsType = {
  logged: boolean;
};
export const Body = (props: BodyPropsType) => {
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
      <Button variant="default">Create room</Button>
      <Separator className="m-4" />
      <CarouselDemo />
    </div>
  );
};
