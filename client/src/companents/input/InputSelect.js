
const InputSelect = ({data, value, setValue, root = false}) => {
    return (
        <div className='mt-5 flex items-center gap-2'>
            <label for={data.name} className='text-gray-500 text-[12px]'>{`${data.label.toUpperCase()}: `}</label>
            <select 
                onChange={root 
                    ? (e) => setValue(prev => ({...prev, [data.name]: e.target.value})) 
                    : (e) => setValue(prev => ({...prev, [data.name]: JSON.parse(e.target.value)}))}
                className="text-[14px]" value={value} name={data.name} id={data.name}
            >
                {data.options.map(item => (
                    <option key={item.value} value={item.value}>{item.text}</option>
                ))}
            </select>
        </div>
    )
}


export default InputSelect