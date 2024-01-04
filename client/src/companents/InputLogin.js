import { memo, useState } from 'react'

const InputLogin = ({ data, index, description, value, setValue }) => {
    const [ show, setShow ] = useState(false)

    return (
        <div className="relative w-full">
            <label 
                className={`text-[11px] absolute w-full mt-8 animate-slice-top bottom-2 text-main ${show || value ? 'block' : 'hidden'}`}
            >{data.label}</label>
            <input 
                onBlur={() => setShow(false)} 
                onFocus={() => setShow(true)} 
                className="w-full outline-none border-b-[1px] py-1 text-[15px] bg-transparent" 
                required 
                placeholder={show ? '' : data.placeholder}
                type={data?.type}
                value={value}
                onChange={(e) => setValue(prev => ({...prev, [data.name]: e.target.value}))}
            >
            </input>
            <span className={`border-b-[1px] border-main absolute bottom-0 left-0 transition-all ${show ? 'w-full' : 'w-0'}`}></span>

            {data?.description &&
                <span className='text-[12px] text-[#737373] mt-1 absolute bottom-[-20px] left-0'>{data?.description}</span>
            }
        </div>
    )

}

export default memo(InputLogin)