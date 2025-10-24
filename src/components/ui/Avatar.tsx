"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "./button";

type AvatarPropsType = {
  src: string ;
  alt: string ;
  size?: number;
  onClick?: () => void;
};

export const Avatar = ({ src, alt = "avatar", size = 48, onClick }: AvatarPropsType) => {
  const [imgError, setImgError] = useState(false);
  const letter = alt.charAt(0).toUpperCase();

  return (
    <Button
      className="overflow-hidden rounded-full flex items-center justify-center border-1   font-bold"
      style={{ width: size, height: size }}
      onClick={onClick}
    >
      {!imgError && src ? (
        <Image
          src={src}
          alt={alt}
          width={size}
          height={size}
          className="object-cover"
          onError={() => setImgError(true)}
        />
      ) : (
        <span className="text-lg">{letter}</span>
      )}
    </Button>
  );
};
