"use client"

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode
  color?:string,
  additionalStyles?:string
}

export const Button = ({ onClick, children,color,additionalStyles }: ButtonProps) => {
  return (
    <button className={`${color} w-full p-2 rounded-md text-white ${additionalStyles}`} onClick={onClick} type="button">
      {children}
    </button>
  )
}

