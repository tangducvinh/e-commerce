import { useState, useEffect, memo } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

import { navHotSales } from '../../ultis/contants'
import { Countdown, SlickProduct } from '../../companents'
import { fecthProducts } from '../../store/appSlice'

const HotSale = ({ hiddenFilter, filterCategory }) => {
    const { hotSales } = useSelector(state => state.app)
    const dispatch = useDispatch()
    const [ filter, setFilter ] = useState(navHotSales[0].filter)

    useEffect(() => {
        if (!filterCategory) {
            dispatch(fecthProducts(filter))
        } else {
            dispatch(fecthProducts(filterCategory))
        }
    }, [filter, filterCategory, dispatch])

    return (
        <div className="flex flex-col px-2 pt-2 bg-center z-2 rounded-2xl bg-[url('https://cdn2.cellphones.com.vn/x/media/catalog/product/h/o/hot-sale-giang-sinh_3.png')] border">
            <div className="flex h-[90px] relative">
                {!hiddenFilter && <div className="flex gap-1 absolute bottom-0">
                    {navHotSales?.map((item, index) => (
                        <div 
                            key={item.title}
                            onClick={() => setFilter(item?.filter)}
                            className={`px-[12px] py-1 text-sm rounded-md flex flex-shrink-0 font-bold cursor-pointer ml-2 ${item.filter === filter ? 'text-white bg-btn-yellow' : 'text-[#E59441] bg-white'}`}
                        >
                            {item.title}
                        </div>
                    ))}
                </div>}

                <div className="flex-7 flex object-cover justify-end items-center">
                    <img alt="banner" src="https://cdn2.cellphones.com.vn/x/media/catalog/product/h/o/hot-sale-cuoi-tuan-final.gif"></img>
                </div>

                <div className="flex-3 flex items-end justify-end">
                    <Countdown />
                </div>
            </div>

            <div className="mt-2 ml-[-8px]">
                <SlickProduct data={hotSales}/>
            </div>
        </div>
    )
}

export default memo(HotSale)