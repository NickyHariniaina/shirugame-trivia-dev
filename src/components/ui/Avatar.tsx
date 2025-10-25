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
      className="overflow-hidden rounded-full flex items-center justify-center border-1   font-bold"
      style={{ width: size, height: size }}
      onClick={onClick}
    >
      {src && !loading ? (
        <img src={src} alt={alt} width={size} height={size} className="object-cover" />
      ) : !loading ? (
        <span className="text-lg">{letter}</span>
      ): <Spinner />}

    </Button>
  );
};
