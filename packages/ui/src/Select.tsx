const Select=({options,onSelect,label}:{
    options:{
        key:string
        value:string
    }[];
    label?:string;
    // eslint-disable-next-line no-unused-vars
    onSelect:(value:string)=>void
})=>{
    return (
        <div className="flex flex-col gap-2">
        <label className="font-semibold">{label}</label>
        <select className="w-full rounded-md p-3 border font-semibold focus:ring-2 ring-lime-900 transition-all transform duration-300 focus:outline-none" onChange={(e)=>{
            onSelect(e.target.value)
        }}>
            {options.map((option)=>(
                <option className="" key={option.key}>{option.value}</option>
            ))}
        </select>
        </div>
    )
};

export default Select;