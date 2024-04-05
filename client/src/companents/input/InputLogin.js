import { memo, useState } from 'react'
import clsx from 'clsx'

const InputLogin = ({ data, index, description, value, setValue, style = {css: 'w-full', color: 'border-main', label: 'text-main'} }) => {
    const [ show, setShow ] = useState(false)

    return (
        <div className={clsx("relative", style.css)}>
            <label 
                className={`text-[11px] absolute w-full mt-8 animate-slice-top bottom-2 ${show ? `block ${style.label}` : value?.length > 0 ? 'block text-[#999]' : 'hidden'}`}
            >{data.label}</label>
            <input 
                onBlur={() => setShow(false)} 
                onFocus={() => setShow(true)} 
                className={"w-full outline-none border-b-[1px] border-gray-300 py-1 text-[15px] bg-transparent"} 
                required 
                placeholder={show ? '' : data.placeholder}
                type={data?.type}
                value={value || ''}
                onChange={(e) => setValue(prev => ({...prev, [data.name]: e.target.value.trim()}))}
            >
            </input>
            <span className={clsx(`border-b-[1px] border-gray-300 absolute bottom-0 left-0 transition-all ${show ? 'w-full' : 'w-0'}`, style.color)}></span>

            {data?.description &&
                <span className='text-[12px] text-[#737373] mt-1 absolute bottom-[-20px] left-0'>{data?.description}</span>
            }
        </div>
    )
}

export default memo(InputLogin)