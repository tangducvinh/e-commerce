import { useParams, useNavigate, createSearchParams, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import * as apis from '../../apis'
import { HotSale, ItemProduct, Pagination, InputSearch } from '../../companents'
import { filters } from '../../ultis/contants'
import { withBaseCompanent } from '../../hocs/withBaseCompanent'

const Products = ({ location }) => {
    const  { category }  = useParams()
    const [ data, setData ] = useState({})
    const [ filterStatus, setFilterStatus ] = useState(filters.length - 1)
    const navigate = useNavigate()
    const [ params ] = useSearchParams()
    const [ showHotSale, setShowHotSale ] = useState(true)
    
    const fetchDataProduct = async(data) => {
        const response = await apis.getAllProducts(data)
        if(response.success) setData(response)
    }

    useEffect(() => {
        const dataParams = Object.fromEntries([...params])
        if (dataParams.title) setShowHotSale(dataParams.title)
        fetchDataProduct({category, ...dataParams})
    }, [params])

    useEffect(() => {
        window.scrollTo(400, 400)
    }, [params])

    const handleSetFilter = (filters) => { 
        setFilterStatus(filters.id)
        let dataParams = Object.fromEntries([...params])

        if (filters.sort) {
            if (dataParams.title) {
                navigate({
                    pathname: location.pathname,
                    search: createSearchParams({
                        sort: filters.sort,
                        title: dataParams.title
                    }).toString()
                })
            } else {
                navigate({
                    pathname: location.pathname,
                    search: createSearchParams({
                        sort: filters.sort,
                    }).toString()
                }) 
            }
        } else {
            if (dataParams.title) {
                navigate({
                    pathname: location.pathname,
                    search: createSearchParams({
                        title: dataParams.title
                    }).toString()
                })
            } else {
                navigate({
                    pathname: location.pathname
                })
            }
        }
    }

    return (
        <div className='flex justify-center'>
            <div className='w-[1220px]'>
                {showHotSale === true ? 
                    <div className='mt-8'>
                        <HotSale hiddenFilter filterCategory={category}/>
                    </div> 
                    :
                    <p className='mt-[20px] text-slate-400'>{`Kết quả tìm kiếm cho: "${showHotSale}"`}</p>
                }

                <div className='mt-4'>
                    <h3 className='text-[18px] text-[#4A4A4A] font-bold'>Sắp xếp theo</h3>

                    <div className='flex items-center justify-between'>
                        <div className='flex gap-2 mt-1'>
                            {filters.map((item, index) => (
                                <div 
                                    key={index}
                                    onClick={() => handleSetFilter(item)}
                                    className={`flex gap-2 items-center font-[500] border py-[7px] px-3 rounded-lg bg-[#F3F4F6] cursor-pointer ${index === filterStatus ? 'border-main bg-[#FEF2F2]' : undefined}`}
                                >  
                                    <span className={index === filterStatus ? 'text-main' : 'text-[#444444]'}>{item.icon}</span>
                                    <span className={`text-[12px] text-[#444444] ${index === filterStatus ? 'text-main' : undefined}`}>{item.content}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className='ml-[-8px] flex flex-wrap mt-3'>
                    {data?.data?.map((item, index) => (
                        <div className='ml-2 w-five mb-2' key={index}>
                            <ItemProduct 
                                key={item?.images[0]}
                                image = {item?.images[0]}
                                discount = {item?.discount}
                                title = {item?.title}
                                price = {item?.price?.price}
                                sale = {item?.price?.sale}
                                star = {Number(item?.totalRatings.rate?.split('')[0])}
                                incentives = {item?.incentives[0]}
                                pid = {item?._id}
                            />
                        </div>
                    ))}
                </div>

                <div className='mt-10 flex justify-center'><Pagination totalProductCount={data?.counts}/></div>

                <div className='h-[50px]'></div>
            </div>
        </div>
    )
}

export default withBaseCompanent(Products)