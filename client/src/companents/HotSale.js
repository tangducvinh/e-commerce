import { useState } from 'react'

import { ItemProduct } from './'
import { navHotSales } from '../ultis/contants'

const HotSale = () => {
    const [ day, setDay ] = useState()
    const [ hour, setHour ] = useState()
    const [ minute, setMinute ] = useState()
    const [ second, setSecond ] = useState()

    


    return (
        <div className="flex flex-col p-2 bg-center rounded-2xl bg-[url('https://cdn2.cellphones.com.vn/x/media/catalog/product/h/o/hot-sale-giang-sinh_3.png')] border">
            <div className="flex h-[90px]">
                <div className="flex items-end flex-3 gap-1">
                    {navHotSales?.map(item => (
                        <div 
                            key={item.title}
                            className="px-[12px] py-1 text-sm rounded-md font-bold cursor-pointer text-[#E59441] bg-white ml-2"
                        >
                            {item.title}
                        </div>
                    ))}
                </div>

                <div className="flex-4 flex object-cover justify-center items-center">
                    <img alt="banner" src="https://cdn2.cellphones.com.vn/x/media/catalog/product/h/o/hot-sale-cuoi-tuan-final.gif"></img>
                </div>

                <div className="flex-3 flex items-end justify-end">
                    <div className="flex gap-1 items-center">
                        <p className="text-[#D88B3D] font-bold text-sm">Kết thúc sau:</p>
                        <span className="w-[25px] h-[25px] flex items-center text-sm font-bold justify-center bg-btn-yellow rounded-md text-black">01</span>
                        <span className="text-[#D88B3D] font-bold">:</span>
                        <span className="w-[25px] h-[25px] flex items-center text-sm font-bold justify-center bg-btn-yellow rounded-md text-black">01</span>
                        <span className="text-[#D88B3D] font-bold">:</span>
                        <span className="w-[25px] h-[25px] flex items-center text-sm font-bold justify-center bg-btn-yellow rounded-md text-black">01</span>
                        <span className="text-[#D88B3D] font-bold">:</span>
                        <span className="w-[25px] h-[25px] flex items-center text-sm font-bold justify-center bg-btn-yellow rounded-md text-black">01</span>
                    </div>
                </div>
            </div>

            <div className="mt-4 flex gap-2">
                <ItemProduct />
            </div>
        </div>
    )
}

export default HotSale