import { useState, useCallback, useEffect, Fragment } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDebounce } from 'use-debounce'
import { useDispatch, useSelector } from 'react-redux'

import icons from '../../ultis/icons'
import { InputSearch, InforProductItem, Pagination, FormAddProduct, ShowLoading } from '../../companents'
import * as apis from '../../apis'
import { appSlice } from '../../store/appSlice'
import { withBaseCompanent } from '../../hocs/withBaseCompanent'

const ManageProducts = () => {
    const { HiUserAdd } = icons
    const [ valueSearch, setValueSearch ] = useState()
    const [ dataProducts, setDataProducts ] = useState()
    const [ params ] = useSearchParams()
    const [ value ] = useDebounce(valueSearch, 800)
    const dispatch = useDispatch()
    const { render } = useSelector(state => state.product)

    const setValue = useCallback((value) => {
        setValueSearch(value)
    }, [])

    const fecthDataProduct = async(passData) => {
        dispatch(appSlice.actions.setChildren(<ShowLoading />))
        const response = await apis.getAllProducts(passData)
        dispatch(appSlice.actions.setChildren(null))
        setDataProducts(response)
    }

    useEffect(() => {
        const getParams = Object.fromEntries([...params])
        if (value) {
            getParams.title = value
        }
        fecthDataProduct({...getParams})
    }, [params, value, render])

    const handleAddProduct = () => {
        dispatch(appSlice.actions.setChildren(<FormAddProduct />))
    }

    return (
        <div className='min-h-main'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-[30px] text-gray-600'>
                    <h3 className='text-[24px]'>Manage Users</h3>
                    <span className='text-[13px] font-[700]'>{`${dataProducts?.counts} total`}</span>
                </div>

                <div className='flex items-center justify-between gap-5'>
                    <InputSearch setValueSearch={setValue} valueSearch={valueSearch}/>

                    <button
                        onClick={handleAddProduct} 
                        className='bg-blue-500 text-[#ffff] gap-2 flex py-2 px-4 rounded-md'
                    >
                        <HiUserAdd size={20}/>
                        <span className='text-[14px]'>Thêm</span>
                    </button>
                </div>
            </div>

            <div className='mt-[30px]'>
                <div className='flex items-center font-[500] text-gray-700 bg-slate-100 px-3 py-2 rounded-md'>
                    <span className='w-[50px]'>STT</span>
                    <span className='w-[35px]'></span>
                    <span className='flex-2'>Tên</span>
                    <span className='flex-1'>Danh mục</span>
                    <span className='flex-1'>Đã bán</span>
                    <span className='flex-1'>Tồn kho</span>
                    <span className='flex-1'>Giá</span>
                    <span className='flex-1'>Đánh giá</span>
                    <span className='w-[35px]'></span>
                </div>

                {dataProducts?.data.map((el, index) => (
                    <Fragment key={el.title}>
                        <InforProductItem pid={el._id} image={el.images[0]} title={el.title} index={index} category={el.category} price={el.price.sale || el.price.price} sold={el.sold} quanlity={el.quanlity} rating={el.star}/>
                    </Fragment>
                ))}

            </div>

            <div className='mt-[30px] flex justify-center'>
                <Pagination changeValue={value} totalProductCount={dataProducts?.counts}/>
            </div>

            <div className='h-[50px]'></div>
        </div>
    )
}

export default withBaseCompanent(ManageProducts)