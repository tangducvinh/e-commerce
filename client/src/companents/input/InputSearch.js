import { memo } from 'react'

import icons from '../../ultis/icons'

const InputSearch = ({ valueSearch, setValueSearch }) => {
    const { IoClose } = icons

    return (
        <div className='flex'>
            <input 
                value={valueSearch}
                onChange={e => setValueSearch(e.target.value)}
                className='bg-[#F3F4F6] w-[250px] py-2 pl-2 outline-none rounded-l-md' placeholder='Tìm kiếm'
            ></input>
            <span onClick={() => setValueSearch('')} className={`w-[40px] bg-[#F3F4F6] cursor-pointer flex justify-center rounded-r-md items-center ${valueSearch ? undefined : 'text-gray-300'}`}><IoClose size={20}/></span>
        </div>
    )
}

export default memo(InputSearch)