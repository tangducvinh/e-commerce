import { memo } from 'react'
import icons from '../../ultis/icons'

const InforProductItem = ({ index, title, category, price, sold, quanlity, rating, image}) => {
    const { BsThreeDots, FaStar } = icons

    return (
        <div className='flex items-center mx-3 py-4 border-b-[1px] mt-2 text-[14px] font-[500]'>
            <span className='w-[50px]'>{`#${index + 1}`}</span>
            <img className='w-[35px] h-[35px] mr-1' src={image} ></img>
            <p className='flex-2'>{title.slice(0, 37)}</p>
            <span className='flex-1'>{`${category.slice(0, 1).toUpperCase()}${category.slice(1)}`}</span>
            <span className='flex-1'>{sold}</span>
            <span className='flex-1'>{quanlity}</span>
            <span className='flex-1'>{price}</span>
            <span className='flex-1 flex items-center h-[30px] gap-1'>
                <span>{rating}</span>
                <span className='mb-1'><FaStar color='F59E0B' /></span>
            </span>
            <span className='w-[35px] h-[35px] flex items-center justify-center rounded-full hover:bg-slate-300 cursor-pointer'><BsThreeDots size={20} /></span>
        </div>
    )
}

export default memo(InforProductItem)