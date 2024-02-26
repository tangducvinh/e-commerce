import { memo, useState } from 'react'
import { Link } from 'react-router-dom'

import { withBaseCompanent } from '../../hocs/withBaseCompanent'
import icons from '../../ultis/icons'

const ItemProductMyCart = ({ isCheck }) => {

    const { GoTrash, IoShieldCheckmarkOutline, FaCircleCheck } = icons
    return (
        <div className='flex w-[600px] border-[1px] rounded-md px-2 py-4'>
            <button className='w-[20px] h-[20px] rounded-full border-2 relative flex items-center justify-center'>
                {isCheck && < FaCircleCheck color='red' />}
            </button>
            <div className='flex flex-auto flex-col'>
                <div className='flex gap-[20px] border-b-[1px] pb-6'>
                    <img className='w-[100px] h-[100px] object-cover' src='https://cdn2.cellphones.com.vn/insecure/rs:fill:350:0/q:80/plain/https://cellphones.com.vn/media/catalog/product/n/o/note-13-pro-plus-2.png'></img>

                    <div className='flex justify-between flex-auto flex-col'>
                        <div className='flex justify-between'>
                            <Link className='text-[#3A3A3A] text-[16px] max-w-[400px] line-clamp-2' to=''>Xiaomi Redmi Note 13 Pro Plus 5G 8GB 256GB-Đen</Link>
                            <GoTrash size='20px' />
                        </div>

                        <div className='flex justify-between'>
                            <div>
                                <span className='text-[#D70018] text-[17px]'>10.590.000đ</span>
                                <span className='text-[#707070] text-[14px] line-through ml-2'>10.990.000đ</span>
                            </div>
                            
                            <div className='flex items-center gap-2'>
                                <button className='w-[30px] h-[30px] bg-[#F3F3F3]'>&#8722;</button>
                                <span className='text-[13px]'>1</span>
                                <button className='w-[30px] h-[30px] bg-[#F3F3F3]'>&#43;</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex items-center mt-3'>
                    <IoShieldCheckmarkOutline size={18} />
                    <p className='ml-2 text-[#212529] text-[15px]'>Bảo vệ toàn diện với Bảo hành mở rộng</p>
                </div>
            </div>
        </div>
    )
}

export default withBaseCompanent(memo(ItemProductMyCart))