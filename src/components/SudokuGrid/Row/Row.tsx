import { ReactNode } from "react";

export default function Row({
  children,
  id,
}: {
  children: ReactNode;
  id: string;
}) {
  return (
    <div id={id} className="flex grow">
      {children}
    </div>
  );
}
