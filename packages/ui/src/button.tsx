"use client"

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode
  color?:string
}

export const Button = ({ onClick, children,color }: ButtonProps) => {
  return (
    <button className={`${color} w-full p-2 rounded-md text-white`} onClick={onClick} type="button">
      {children}
    </button>
  )
}

