import { ReactNode } from "react";

export default function Row({ children }: { children: ReactNode }) {
  return <div className="flex grow">{children}</div>;
}
