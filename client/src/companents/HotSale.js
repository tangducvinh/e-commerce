import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Slice from 'react-slick'

import { ItemProduct } from './'
import { navHotSales } from '../ultis/contants'
import { Countdown, ButtonNavigate } from '../companents'
import { useDispatch } from 'react-redux'
import { fecthProducts } from '../store/appSlice'

const HotSale = () => {
    const { hotSales } = useSelector(state => state.app)
    const dispatch = useDispatch()
    const [ filter, setFilter ] = useState(navHotSales[0].filter)

    var settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnFocus: false,
        pauseOnHover: false,
        pauseOnDotsHover: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
    }

    useEffect(() => {
        dispatch(fecthProducts(filter))
    }, [filter])

    return (
        <div className="flex flex-col p-2 bg-center z-2 rounded-2xl bg-[url('https://cdn2.cellphones.com.vn/x/media/catalog/product/h/o/hot-sale-giang-sinh_3.png')] border">
            <div className="flex h-[90px] relative">
                <div className="flex gap-1 absolute bottom-0">
                    {navHotSales?.map((item, index) => (
                        <div 
                            key={item.title}
                            onClick={() => setFilter(item?.filter)}
                            className={`px-[12px] py-1 text-sm rounded-md flex flex-shrink-0 font-bold cursor-pointer ml-2 ${item.filter === filter ? 'text-white bg-btn-yellow' : 'text-[#E59441] bg-white'}`}
                        >
                            {item.title}
                        </div>
                    ))}
                </div>

                <div className="flex-7 flex object-cover justify-end items-center">
                    <img alt="banner" src="https://cdn2.cellphones.com.vn/x/media/catalog/product/h/o/hot-sale-cuoi-tuan-final.gif"></img>
                </div>

                <div className="flex-3 flex items-end justify-end">
                    <Countdown />
                </div>
            </div>

            <div className="mt-4 ml-[-8px]">
                <Slice {...settings}>
                    {hotSales?.map(item => (
                        <ItemProduct 
                            image = {item?.images[0]}
                            discount = {item?.discount}
                            title = {item?.title}
                            price = {item?.price?.price}
                            sale = {item?.price?.sale}
                            star = {item?.star}
                        />
                    ))}
                </Slice>
            </div>
        </div>
    )
}

export default HotSale