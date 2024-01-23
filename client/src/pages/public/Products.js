import { useParams, useNavigate, createSearchParams, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'

import * as apis from '../../apis'
import { HotSale, ItemProduct, Pagiantion } from '../../companents'
import { filters } from '../../ultis/contants'
import icons from '../../ultis/icons'

const Products = () => {
    const  { category }  = useParams()
    const [ data, setData ] = useState({})
    const [ filterStatus, setFilterStatus ] = useState(filters.length - 1)
    const { IoClose } = icons
    const [ valueSearch, setValueSearch ] = useState('')
    const [ value ] = useDebounce(valueSearch, 1000)
    const navigate = useNavigate()
    const [ params ] = useSearchParams()

    useEffect(() => {
        let dataPrams = {}
        for (let i of params.entries()) {
            dataPrams[i[0]] = i[1]
        }
        fetchDataProduct({category, ...dataPrams})
    }, [params, value])

    useEffect(() => {
        window.scrollTo(400, 400)
    }, [params])

    const fetchDataProduct = async(data) => {
        const response = await apis.getAllProducts(data)
        setData({counts: response.counts, data: response.data.filter(el => el.title?.toLowerCase().includes(value))})
    }

    const handleSetFilter = (filters) => { 
        setFilterStatus(filters.id)
        if (filters.sort) {
            navigate({
                pathname: `/products/${category}`,
                search: createSearchParams({
                    sort: filters.sort,
                }).toString()
            })
        } else {
            navigate(`/products/${category}`)
        }
    }

    return (
        <div className='flex justify-center'>
            <div className='w-[1220px]'>
                <div className='mt-8'>
                    <HotSale hiddenFilter filterCategory={category}/>
                </div>

                <div className='mt-8'>
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

                        <div className='flex'>
                            <input 
                                value={valueSearch}
                                onChange={e => setValueSearch(e.target.value)}
                                className='bg-[#F3F4F6] w-[250px] py-2 pl-2 outline-none rounded-l-md' placeholder='Tìm kiếm'
                            ></input>
                            <span onClick={() => setValueSearch('')} className={`w-[40px] bg-[#F3F4F6] cursor-pointer flex justify-center rounded-r-md items-center ${valueSearch ? undefined : 'text-gray-300'}`}><IoClose size={20}/></span>
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
                                star = {item?.star}
                                incentives = {item?.incentives[0]}
                                link = {item?._id}
                            />
                        </div>
                    ))}
                </div>

                <div className='mt-10 flex justify-center'><Pagiantion totalProductCount={data?.counts}/></div>

                <div className='h-[50px]'></div>
            </div>
        </div>
    )
}

export default Products