import { memo } from 'react'

import icons from '../ultis/icons'

const ItemProduct = ({ image, discount, title, price, sale, star }) => {
    const { FaStar, FaRegHeart } = icons

    return (
        <div className="flex flex-col ml-2 bg-white h-full rounded-xl p-3 relative">
            <div className="flex justify-center mt-2">
                <img className="w-[160px] h-[160px] object-cover" alt="product" src={image} ></img>
            </div>

            <div className="px-3 py-1 rounded-l-sm absolute top-0 left-[-5px] bg-main rounded-r-xl flex justify-center items-center">
                <span className="text-white text-[12px] font-[700]">{`Giảm ${discount}%`}</span>
            </div>

            <div className="mt-2 gap-4 flex flex-col">
                <p className="text-[#444444] font-[500] h-[100px]">{title}</p>

                <div className="flex gap-1 font-[500]">
                    <p className="font-[16px] text-[#D70018]">{price}</p>
                    <p className="font-sm text-[#707070] line-through">{sale}</p>
                </div>

                <div className="flex items-center">
                    {star == 5 && 
                        <div className="flex gap-1">
                            <FaStar color='#F59E0B' />
                            <FaStar color='#F59E0B' />
                            <FaStar color='#F59E0B' />
                            <FaStar color='#F59E0B' />
                            <FaStar color='#F59E0B' />
                        </div>
                    }

                    <div className="flex items-center gap-2 justify-end w-full">
                        <span className="text-[12px] text-[#777777]">Yêu thích</span>
                        <span className="cursor-pointer"><FaRegHeart size={20} color="#A10A04"/></span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(ItemProduct)