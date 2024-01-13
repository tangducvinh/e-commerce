import { memo } from 'react'
import { Link } from 'react-router-dom'

import icons from '../ultis/icons'
import path from '../ultis/path'

const ItemProduct = ({ image, discount, title, price, sale, star, incentives, link }) => {
    const { FaStar, FaRegHeart } = icons

    return (
        <Link 
            to={`/${path.DETAIL_PRODUCT}/${link}`}
            className="flex flex-col ml-2 bg-white h-full rounded-xl p-3 relative mt-[10px] shadow-lg"
        >
            <div className="flex justify-center mt-2">
                <img className="w-[160px] h-[160px] object-cover" alt="product" src={image} ></img>
            </div>

            <div className="px-3 py-1 rounded-l-sm absolute top-0 left-[-5px] bg-main rounded-r-xl flex justify-center items-center">
                <span className="text-white text-[12px] font-[700]">{`Giảm ${discount}%`}</span>
            </div>

            <div className="mt-2 flex flex-col">
                <p className="text-[#444444] font-[500] line-clamp-3 h-[75px]">{title}</p>

                <div className="flex gap-1 font-[500]">
                    <p className="font-[16px] text-[#D70018]">{sale}</p>
                    <p className="font-sm text-[#707070] line-through">{price}</p>
                </div>

                {incentives?.length ? 
                    <div className="bg-[#F3F4F6] min-h-10 px-1 py-[2px] mt-2 mb-2 rounded-md"><p className="text-[12px] line-clamp-2">{incentives}</p></div>
                    :
                    <div className="px-1 py-[2px] mt-2 mb-2 min-h-10"></div>
                }

                <div className="flex items-center">
                    {star === 5 && 
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
        </Link>
    )
}

export default memo(ItemProduct)