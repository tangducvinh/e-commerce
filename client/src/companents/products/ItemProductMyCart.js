import { memo } from 'react'
import { Link } from 'react-router-dom'

import { withBaseCompanent } from '../../hocs/withBaseCompanent'
import { ShowLoading } from '../../companents'
import icons from '../../ultis/icons'
import * as apis from '../../apis'
import { userSlice } from '../../store/userSlice'
import { appSlice } from '../../store/appSlice'
import swal from 'sweetalert'

const ItemProductMyCart = ({ isChecked, image, name, price, discount, quanlity, color, onCheck, pid, id, onDeleteProduct, dispatch, path }) => {

    const handleChangeQuanlity = async(type) => {
        if (type === 'minus' && quanlity <= 1) {
            return swal('Warning', 'Số lượng sản phẩm tối thiểu là 1', 'warning')
        }

        dispatch(appSlice.actions.setChildren(<ShowLoading hiddenBackground />))
        let response
        if (type === 'minus') {
            response = await apis.updateQuanlityProductCart({pid, color, status: -1})
        } else {
            response = await apis.updateQuanlityProductCart({pid, color, status: 1})
        }
        dispatch(appSlice.actions.setChildren(null))

        if (response.data.success) {
            dispatch(userSlice.actions.setDataUserCurrent(response.data.data))
        }
    }

    const { GoTrash, IoShieldCheckmarkOutline, FaCircleCheck } = icons
    return (
        <div className='flex border-[1px] border-gray-300 rounded-md px-2 py-4'>
            <button onClick={() => onCheck(id)} className='w-[20px] h-[20px] rounded-full border-2 border-gray-300 relative flex items-center justify-center'>
                {isChecked && < FaCircleCheck color='red' />}
            </button>
            <div className='flex flex-auto flex-col'>
                <div className='flex gap-[20px] border-b-[1px] border-gray-300 pb-6'>
                    <img className='w-[100px] h-[100px] object-cover' alt='anh' src={image}></img>

                    <div className='flex justify-between flex-auto flex-col'>
                        <div className='flex justify-between'>
                            <Link to={path} className='text-[#3A3A3A] text-[16px] max-w-[400px] line-clamp-2'>{`${name} - ${color}`}</Link>
                            <button onClick={() => onDeleteProduct({pid, color, id})}><GoTrash size='20px' /></button>
                        </div>

                        <div className='flex justify-between'>
                            <div>
                                <span className='text-[#D70018] text-[17px]'>{
                                    discount ? Number(discount?.replace(/\D/g, "")).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})
                                    : Number(price?.replace(/\D/g, "")).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})
                                }</span>
                                {discount && <span className='text-[#707070] text-[14px] line-through ml-2'>{Number(price?.replace(/\D/g, "")).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</span>}
                            </div>
                            
                            <div className='flex items-center gap-2'>
                                <button onClick={() => handleChangeQuanlity('minus')} className='w-[30px] h-[30px] bg-[#F3F3F3]'>&#8722;</button>
                                <span className='text-[13px] w-[20px] text-center'>{quanlity}</span>
                                <button onClick={() => handleChangeQuanlity('plus')} className='w-[30px] h-[30px] bg-[#F3F3F3]'>&#43;</button>
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