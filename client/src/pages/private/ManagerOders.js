import { useState, useEffect, Fragment } from 'react'
import { useDebounce} from 'use-debounce'
import { useSearchParams } from 'react-router-dom'

import { InputSearch, InforOrderItem, ShowLoading, EmptyPage, Pagination } from '../../companents'
import * as apis from '../../apis'
import { withBaseCompanent } from '../../hocs/withBaseCompanent'
import { appSlice } from '../../store/appSlice'

const ManageOders = ({ dispatch }) => {
    const [ valueSearch, setValueSearch ] = useState('')
    const [ dataOrders, setDataOrders ] = useState()
    const [ value ] = useDebounce(valueSearch)
    const [ params ] = useSearchParams()
    
    const getOrderProduct = async(data) => {
        dispatch(appSlice.actions.setChildren(<ShowLoading hiddenBackground />))
        const response = await apis.getOrders(data)
        dispatch(appSlice.actions.setChildren(null))
        if (response.data.success) {
            setDataOrders(response?.data)
        }
    }

    useEffect(() => {
        let data = {}
        if(value) data.indexOrder = value
        
        const getParams = Object.fromEntries([...params])
        data = {...data, ...getParams}

        getOrderProduct(data)
    }, [value, params])

    return (
        <div className="min-h-main">
            <div className='flex items-center gap-[30px] text-gray-600'>
                <h3 className='text-[24px]'>Quản lí đơn hàng</h3>
                <span className='text-[13px] font-[700]'>{`${dataOrders?.counts} total`}</span>
            </div>

            <div className='mt-[20px]'>
                <InputSearch placeholder={'Nhập mã đơn: 1, 2...'} valueSearch={valueSearch} setValueSearch={setValueSearch} />
            </div>

            <div className='mt-[30px]'>
                <div className='flex gap-4 items-center font-[500] text-gray-700 bg-slate-100 px-3 py-2 rounded-md'>
                    <span className='w-[80px]'>Mã đơn hàng</span>
                    <span className='flex-1'>Tên khách hàng</span>
                    <span className='flex-2'>Tên sản phẩm</span>
                    <span className='flex-1'>Ngày đặt</span>
                    <span className='flex-1'>Giá sản phẩm</span>
                    <span className='flex-1'>Trạng thái</span>
                    <span className='flex-1'>Phương thức</span>
                </div> 

                {dataOrders?.data.length === 0 ?
                    <div className='mt-7'>
                        <EmptyPage />
                    </div>
                    :
                    <div className='flex flex-col gap-2'>
                        {dataOrders && [...dataOrders.data].reverse().map((el, index) => (
                            <Fragment key={el.title}>
                                <InforOrderItem 
                                    data={{...el}}
                                />
                            </Fragment>
                        ))}
                    </div>    
                }
            </div>

            <div className='flex justify-center mt-8'><Pagination totalProductCount={dataOrders?.counts} ></Pagination></div>
        </div>
    )
}

export default withBaseCompanent(ManageOders)