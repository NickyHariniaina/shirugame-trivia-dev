"use client";

import { useEffect, useRef } from "react";
import Typed from "typed.js";

type TypedTextProps = {
  strings: string[];
  typeSpeed?: number;
  backSpeed?: number;
  loop?: boolean;
};

export default function TypedText({
  strings,
  typeSpeed = 50,
  backSpeed = 30,
  loop = true,
}: TypedTextProps) {
  const el = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!el.current) return;

    const typed = new Typed(el.current, {
      strings,
      typeSpeed,
      backSpeed,
      loop,
      showCursor: false,
    });

    return () => {
      typed.destroy();
    };
  }, [strings, typeSpeed, backSpeed, loop]);

  return <span ref={el}/>
}
