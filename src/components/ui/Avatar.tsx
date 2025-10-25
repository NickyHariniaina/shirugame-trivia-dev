"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "./button";
import { Spinner } from "./spinner";

type AvatarPropsType = {
  src: string ;
  alt: string ;
  size?: number;
  onClick?: () => void;
  loading?: boolean;
};

export const Avatar = ({ loading = false, src, alt = "avatar", size = 48, onClick }: AvatarPropsType) => {
  const letter = alt.charAt(0).toUpperCase();

  return (
    <Button
      variant="secondary"
      className="overflow-hidden rounded-full flex items-center justify-center border font-bold p-0"
      style={{ width: size, height: size }}
      onClick={onClick}
    >
      {src && !loading ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover object-center rounded-full"
        />
      ) : !loading ? (
        <span className="text-lg">{letter}</span>
      ) : (
        <Spinner />
      )}
    </Button>
  );
};
