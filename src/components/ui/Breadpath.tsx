type BreadPathProps = {
  path: string[];
};

// TODO: make it work lol.
// NOTE: here i should shrink with ... in case the path is too long.
export const Breadpath = (props: BreadPathProps) => {
  return (
    <div className="flex flex-row items-center gap-2">
      {props.path.map((item, index) => (
        <span key={index}>{item}</span>
      ))}
    </div>
  );
};
