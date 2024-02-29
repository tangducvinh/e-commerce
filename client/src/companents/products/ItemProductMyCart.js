import { memo } from 'react'
import { Link } from 'react-router-dom'

import { withBaseCompanent } from '../../hocs/withBaseCompanent'
import icons from '../../ultis/icons'
import * as apis from '../../apis'
import { userSlice } from '../../store/userSlice'

const ItemProductMyCart = ({ isChecked, image, name, price, discount, quanlity, color, onCheck, pid, onDeleteProduct, dispatch }) => {

    const handlePlusQuanlity = async() => {
        const response = await apis.updateQuanlityProductCart({pid, color, status: 1})

        if (response.data.success) {
            dispatch(userSlice.actions.setDataUserCurrent(response.data.data))
        }
    }

    const handleMinusQuanlity = async() => {
        const response = await apis.updateQuanlityProductCart({pid, color, status: -1})

        if (response.data.success) {
            dispatch(userSlice.actions.setDataUserCurrent(response.data.data)) 
        }
    }

    const { GoTrash, IoShieldCheckmarkOutline, FaCircleCheck } = icons
    return (
        <div className='flex border-[1px] rounded-md px-2 py-4'>
            <button onClick={() => onCheck(pid)} className='w-[20px] h-[20px] rounded-full border-2 relative flex items-center justify-center'>
                {isChecked && < FaCircleCheck color='red' />}
            </button>
            <div className='flex flex-auto flex-col'>
                <div className='flex gap-[20px] border-b-[1px] pb-6'>
                    <img className='w-[100px] h-[100px] object-cover' src={image}></img>

                    <div className='flex justify-between flex-auto flex-col'>
                        <div className='flex justify-between'>
                            <Link className='text-[#3A3A3A] text-[16px] max-w-[400px] line-clamp-2' to=''>{`${name} - ${color}`}</Link>
                            <button onClick={() => onDeleteProduct({pid, color})}><GoTrash size='20px' /></button>
                        </div>

                        <div className='flex justify-between'>
                            <div>
                                <span className='text-[#D70018] text-[17px]'>{discount || price}</span>
                                {discount && <span className='text-[#707070] text-[14px] line-through ml-2'>{price}</span>}
                            </div>
                            
                            <div className='flex items-center gap-2'>
                                <button onClick={handleMinusQuanlity} className='w-[30px] h-[30px] bg-[#F3F3F3]'>&#8722;</button>
                                <span className='text-[13px]'>{quanlity}</span>
                                <button onClick={handlePlusQuanlity} className='w-[30px] h-[30px] bg-[#F3F3F3]'>&#43;</button>
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