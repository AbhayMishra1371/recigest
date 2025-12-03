import React from "react";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  children?: React.ReactNode;
  className?: string;
};

export const Card = ({ children, className = "", ...props }: CardProps) => {
  return (
    <div {...props} className={`rounded-xl bg-slate-800/30 ${className}`}>
      {children}
    </div>
  );
};

export default Card;
