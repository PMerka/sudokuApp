import { ComponentPropsWithoutRef } from "react";

interface Position {
  x: number;
  y: number;
}

interface CellProps extends ComponentPropsWithoutRef<"input"> {
  position: Position;
  isInit: boolean;
  inputRefs: React.LegacyRef<HTMLInputElement> | undefined;
}

export default function Cell({
  position,
  inputRefs,
  isInit,
  ...props
}: CellProps) {
  const xSquere = Math.floor(position.x / 3);
  const ySquere = Math.floor(position.y / 3);
  const isDarkBg = (xSquere + ySquere) % 2 === 0;

  return (
    <div
      className={`aspect-square flex-1 items-center justify-center md:text-xl border-solid border-gray-300 ${
        isDarkBg && "bg-gray-200"
      } border-2 `}
    >
      <input
        ref={inputRefs}
        className={`w-full h-full text-center bg-transparent ${
          isInit && "font-bold"
        }`}
        onDrag={(e) => e.preventDefault()}
        {...props}
      />
    </div>
  );
}
