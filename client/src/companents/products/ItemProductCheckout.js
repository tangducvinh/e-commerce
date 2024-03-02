import { memo } from 'react'

import clsx from 'clsx'

const ItemProductCheckout = ({image, name, color, price, sale, quantity, style}) => {
    return (
        <div className={clsx('flex items-center gap-2 pb-4', style)}>
            <img className='w-[70px] h-[70px] object-contant' src={image} alt='anh'></img>
            <div className='w-full'>
                <p className='text-[16px] line-clamp-2 text-[#111111] font-medium'>{`${name} - ${color}`}</p>
                <div className='flex items-center justify-between mt-2'>
                    <div>
                        <span className='text-[17px] text-main'>{sale || price}</span>
                        {sale && <span className='text-[14px] ml-2 text-[#7D7D7D] line-through'>{price}</span>}
                    </div>
                    <p className='text[16px]'>Số lượng: <span className='text-main'>{quantity}</span></p>
                </div>
            </div>
        </div>
    )   
}

export default memo(ItemProductCheckout)