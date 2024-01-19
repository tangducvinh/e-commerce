import { memo, useState, useEffect } from 'react'

import * as apis from '../apis'
import avatar from '../assets/imgs/avatar.png'
import { renderStar } from '../ultis/func'

const ItemUserComment = ({userId, comment, star}) => {
    const [dataUser, setDataUser ] = useState({})

    const fecthDataUser = async() => {
        const response = await apis.getInforUser(userId)
        setDataUser(response)
    }

    useEffect(() => {
        fecthDataUser()
    }, [userId])

    return (
        <div>
            <div className='flex gap-2 items-center'>
                <img src={avatar} alt='avatar' className='w-[32px] h-[32px] object-cover rounded-full'></img>
                <p className='text-[14px] text-[#4A4A4A] font-bold'>{dataUser?.name}</p>
            </div>

            <div className='ml-[42px]'>
                <div className='flex gap-1'>
                    {renderStar(star, 14).map((item, index) => item)}
                </div>

                <p className='text-[13px] text-[#4A4A4A] mt-2'>{comment}</p>
            </div>
        </div>
    )
}

export default memo(ItemUserComment)