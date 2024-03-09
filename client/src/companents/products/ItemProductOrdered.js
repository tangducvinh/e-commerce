import { Link } from 'react-router-dom'
import { memo } from 'react'
import swal from 'sweetalert'

import path from '../../ultis/path'
import * as apis from '../../apis'
import { withBaseCompanent } from '../../hocs/withBaseCompanent'
import { userSlice } from '../../store/userSlice'

const ItemProductOrdered = ({ image, name, price, color, quantity, pid, dispatch}) => {

    const handleAddToCart = async() => {
        const response = await apis.updateCart({pid, color})
        swal(response.data.success ? 'Congratulations' : 'Opps', response.data.mes, response.data.success ? 'success' : 'error')
        if (response.data.success) {
            dispatch(userSlice.actions.setDataUserCurrent(response.data.data))
        }
    }

    return (
        <div>
            <div className='flex items-center gap-2'>
                <img className='w-[100px] h-[100px] object-cover' alt='ảnh sản phẩm' src={image} ></img>

                <div className="flex flex-col gap-1 w-full">
                    <div className="flex items-center w-full justify-between">
                        <Link to={`/${path.DETAIL_PRODUCT}/${pid}`} className="text-[16px] font-semibold">{name}</Link>
                        <p className='text-[14px] text-main font-medium'>{price}</p>
                    </div>
                    <p className="text-[14px]">{`Màu sắc: ${color}`}</p>
                    <p className="text-[14px]">{`Số lượng: ${quantity}`}</p>
                </div>
            </div>

            <div className="flex item-center justify-end mt-4">
                <div className='flex items-center mr-8'>
                    <Link to={`/${path.DETAIL_PRODUCT}/${pid}`} className='border-r-[2px] text-[14px] font-medium pr-2 text-purple-800'>Chi tiết sản phẩm</Link>
                    <button onClick={handleAddToCart} className='pl-2 font-medium text-[14px] text-purple-800'>Mua lại</button>
                </div>
            </div>

        </div>
    )
}

export default withBaseCompanent(memo(ItemProductOrdered))