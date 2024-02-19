import { useState, useCallback, useEffect, Fragment } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDebounce } from 'use-debounce'
import { useDispatch } from 'react-redux'

import icons from '../../ultis/icons'
import { InputSearch, InforProductItem, Pagination, FormAddProduct} from '../../companents'
import * as apis from '../../apis'
import { appSlice } from '../../store/appSlice'

const ManageProducts = () => {
    const { HiUserAdd } = icons
    const [ valueSearch, setValueSearch ] = useState()
    const [ dataProducts, setDataProducts ] = useState()
    const [ params ] = useSearchParams()
    const [ value ] = useDebounce(valueSearch, 800)
    const dispatch = useDispatch()

    const setValue = useCallback((value) => {
        setValueSearch(value)
    }, [valueSearch])

    const fecthDataProduct = async(passData) => {
        const response = await apis.getAllProducts(passData)
        setDataProducts(response)
    }

    useEffect(() => {
        const getParams = Object.fromEntries([...params])
        if (value) getParams.title = valueSearch
        fecthDataProduct({...getParams})
    }, [params, value])

    const handleAddProduct = () => {
        dispatch(appSlice.actions.setShowChildren(true))
        dispatch(appSlice.actions.setChildren(<FormAddProduct />))
    }

    return (
        <div>
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
                        <InforProductItem image={el.images[0]} title={el.title} index={index} category={el.category} price={el.price.sale} sold={el.sold} quanlity={el.quanlity} rating={el.star}/>
                    </Fragment>
                ))}

            </div>

            <div className='mt-[30px] flex justify-center'>
                <Pagination totalProductCount={dataProducts?.counts}/>
            </div>

            <div className='h-[50px]'></div>
        </div>
    )
}

export default ManageProducts