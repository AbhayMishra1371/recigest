import React from "react"

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: React.ReactNode
  className?: string
}

export const Button = ({ children, className = "", ...props }: ButtonProps) => {
  return (
    <button {...props} className={`inline-flex items-center justify-center rounded-md px-3 py-2 ${className}`}>
      {children}
    </button>
  )
}

export default Button
