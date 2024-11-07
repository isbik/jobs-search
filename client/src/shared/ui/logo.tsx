import React from "react";

import { cn } from "../lib";

type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
>;

const Logo = (props: Props) => {
  return (
    <span
      {...props}
      className={cn("text-xl font-black text-blue-500", props.className)}
    >
      JJ
    </span>
  );
};

export { Logo };
