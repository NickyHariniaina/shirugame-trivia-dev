import Image from "next/image";

type AvatarPropsType = {
  src: string;
  alt?: string;
  size?: number; // pixel size
};

export const Avatar = ({ src, alt = "avatar", size = 48 }: AvatarPropsType) => {
  return (
    <div
      className="overflow-hidden rounded-full"
      style={{ width: size, height: size }}
    >
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        className="object-cover"
      />
    </div>
  );
};
