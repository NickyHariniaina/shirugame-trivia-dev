"use client";

import Image from "next/image";
import { useState } from "react";

type AvatarPropsType = {
  src: string | undefined;
  alt: string | undefined;
  size?: number;
  onClick?: () => void;
};

export const Avatar = ({ src, alt = "avatar", size = 48, onClick }: AvatarPropsType) => {
  const [imgError, setImgError] = useState(false);
  const letter = alt.charAt(0).toUpperCase();

  return (
    <div
      className="overflow-hidden rounded-full flex items-center justify-center border-1  m-4 text-black dark:text-white  font-bold"
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
    </div>
  );
};
