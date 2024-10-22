const Card = ({ title, children, additionalStyles }: { title: string, children: React.ReactNode, additionalStyles?: string }) => {
  return (
    <div className={`relative border-[1.8px] border-black border-b-[8px] border-e-[8px] rounded-2xl flex flex-col overflow-hidden  ${additionalStyles}`}>
      <p className="px-5 py-3 font-bold">{title}</p>
      <div className="h-full px-5 py-3 flex flex-col gap-4 justify-center">
        {children}
      </div>
    </div>
  )
};

export default Card;