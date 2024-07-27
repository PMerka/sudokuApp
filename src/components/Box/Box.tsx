import { ReactNode } from "react";

export default function Box({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-white shadow-lg m-1 md:m-3 p-5 rounded-xl ${className}`}
    >
      {children}
    </div>
  );
}
