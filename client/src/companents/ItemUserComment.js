import { memo } from 'react'

import avatar from '../assets/imgs/avatar.png'
import { renderStar } from '../ultis/func'
import moment from 'moment'
import icons from '../ultis/icons'

const ItemUserComment = ({userName, comment, star, updatedAt}) => {
    const { IoTimeOutline } = icons

    return (
        <div>
            <div className='flex gap-2 items-center'>
                <img src={avatar} alt='avatar' className='w-[32px] h-[32px] object-cover rounded-full'></img>
                <p className='text-[14px] text-[#4A4A4A] font-bold'>{userName}</p>

                <div className='flex justify-center gap-1 text-[12px] text-[#707070] ml-2'>
                    <IoTimeOutline color='black' size={17} />
                    <span>{moment(updatedAt).format("DD-MM-YYYY")}</span>
                    <span>{moment(updatedAt).format('HH:mm')}</span>
                </div>
            </div>

            <div className='ml-[42px]'>
                <div className='flex gap-1'>
                    {renderStar(star, 14).map((item, index) => <span key={index}>{item}</span>)}
                </div>

                <p className='text-[13px] text-[#4A4A4A] mt-2'>{comment}</p>
            </div>
        </div>
    )
}

export default memo(ItemUserComment)