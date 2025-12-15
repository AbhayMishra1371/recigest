import React from "react";

type ButtonVariant =
  | "default"
  | "ghost"
  | "outline"
  | "secondary"
  | "primary"
  | "snap";

type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: React.ReactNode;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const variantClasses: Record<ButtonVariant, string> = {
  default: "bg-primary text-primary-foreground hover:bg-primary/90",
  ghost: "hover:bg-accent hover:text-accent-foreground",
  outline:
    "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  primary: "bg-primary text-primary-foreground hover:bg-primary/90",
  snap: "bg-accent text-accent-foreground hover:bg-accent/90",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-3 py-2",
  lg: "px-4 py-2.5 text-lg",
};

export const Button = ({
  children,
  className = "",
  variant = "default",
  size = "md",
  ...props
}: ButtonProps) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  const variantClass = variantClasses[variant];
  const sizeClass = sizeClasses[size];
  return (
    <button
      {...props}
      className={`${baseClasses} ${variantClass} ${sizeClass} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
