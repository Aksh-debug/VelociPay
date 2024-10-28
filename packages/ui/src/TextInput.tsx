"use client"

// eslint-disable-next-line no-unused-vars
const TextInput=({placeholder,label,onChange,color}:{placeholder:string,label:string,onChange:(value:string)=>void,color?:string})=>{
    return (
        <div className="flex flex-col gap-2">
            <label className="font-semibold">{label}</label>   
            <input className={`w-full rounded-md focus:outline-none focus:ring-2 ring-black transition-all transform duration-300 p-3 border-[1.5px]`} onChange={(e)=>onChange(e.target.value)} placeholder={placeholder}/>
        </div>
    )
};

export default TextInput;