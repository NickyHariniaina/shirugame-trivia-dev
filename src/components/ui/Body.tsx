import { motion } from "motion/react";

type BodyPropsType = {
  logged: boolean;
};
export const Body = (props: BodyPropsType) => {
  return (
    <div className="w-[100%] flex flex-col gap-2 justify-center items-center">
      <motion.h1
        className="cursor-pointer text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
        whileHover={{ scale: 1.4 }}
      >
        Shirugame
      </motion.h1>
    </div>
  );
};
