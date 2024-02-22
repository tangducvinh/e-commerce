import { memo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { FormEditProduct } from '../../companents'
import icons from '../../ultis/icons'
import { appSlice } from '../../store/appSlice'
import { productSlice } from '../../store/productSlice'
import * as apis from '../../apis'
import swal from 'sweetalert'

const InforProductItem = ({pid, index, title, category, price, sold, quanlity, rating, image}) => {
    const { BsThreeDots, FaStar } = icons
    const [ show, setShow ] = useState(false)
    const dispatch = useDispatch()
    const { render } = useSelector(state => state.product)

    const handleEditProduct = () => {
        dispatch(appSlice.actions.setChildren(<FormEditProduct pid={pid} />))
    }

    const handleDeleteProduct = async() => {
        swal({
            title: 'Are you sure',
            text: 'Bạn có chắc chắn muốn xoá không?',
            buttons: true,
        }).then(async(result) => {
            if (result) {
                const response = await apis.deleteProduct(pid)
                swal(response.success ? 'congratulations' : 'Oops', response.mes, response.success ? 'success' : 'error')
                if (response.success) {
                    dispatch(productSlice.actions.setRender(!render))
                }
            }
        })
    }

    return (
        <div className='flex items-center mx-3 py-4 border-b-[1px] mt-2 text-[14px] font-[500]'>
            <span className='w-[50px]'>{`#${index + 1}`}</span>
            <img className='w-[35px] h-[35px] mr-1' src={image} ></img>
            <p className='flex-2'>{title?.slice(0, 37)}</p>
            <span className='flex-1'>{`${category.slice(0, 1).toUpperCase()}${category.slice(1)}`}</span>
            <span className='flex-1'>{sold}</span>
            <span className='flex-1'>{quanlity}</span>
            <span className='flex-1'>{price}</span>
            <span className='flex-1 flex items-center h-[30px] gap-1'>
                <span>{rating}</span>
                <span className='mb-1'><FaStar color='F59E0B' /></span>
            </span>
            <div onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)} className='relative w-[35px] cursor-pointer h-[35px] flex items-center justify-center mr-2 rounded-full hover:bg-gray'>
                <BsThreeDots size={20} />

                {show && 
                    <div className='absolute w-[100px] bg-slate-100 shadow-md top-[35px] rounded-md flex flex-col z-10'>
                        <button onClick={handleEditProduct} className='py-1 px-4 font-[500] border border-transparent hover:border rounded-md hover:border-gray-500'>Sửa</button>
                        <button onClick={handleDeleteProduct} className='py-1 px-4 font-[500] border border-transparent hover:border rounded-md hover:border-gray-500'>Xoá</button>
                    </div>
                }
            </div>
        </div>
    )
}

export default memo(InforProductItem)