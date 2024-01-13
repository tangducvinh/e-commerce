import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import * as apis from '../../apis'
import { HotSale, ItemProduct } from '../../companents'
import { filters } from '../../ultis/contants'

const Products = () => {
    const { category } = useParams()
    const [ data, setData ] = useState([])
    const [ filterStatus, setFilterStatus ] = useState()

    const fetchDataProduct = async(data) => {
        const response = await apis.getAllProducts(data)
        setData(response)
    }

    useEffect(() => {
        fetchDataProduct({category, limit: 100})
    }, [category])

    console.log(data)

    return (
        <div className='flex justify-center'>
            <div className='w-[1220px]'>
                <div className='mt-8'>
                    <HotSale hiddenFilter filterCategory={category}/>
                </div>

                <div className='mt-8'>
                    <h3 className='text-[18px] text-[#4A4A4A] font-bold'>Sắp xếp theo</h3>

                    <div className='flex gap-2 mt-1'>
                        {filters.map((item, index) => (
                            <div 
                                onClick={() => setFilterStatus(index)}
                                className={`flex gap-2 items-center font-[500] border py-[7px] px-3 rounded-lg bg-[#F3F4F6] cursor-pointer ${index === filterStatus ? 'border-main bg-[#FEF2F2]' : undefined}`}
                            >  
                                <span className={index === filterStatus ? 'text-main' : 'text-[#444444]'}>{item.icon}</span>
                                <span className={`text-[12px] text-[#444444] ${index === filterStatus ? 'text-main' : undefined}`}>{item.content}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className='ml-[-8px] flex flex-wrap mt-3'>
                    {data.map(item => (
                        <div className='ml-2 w-five mb-2'>
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

                <div className='h-[50px]'></div>
            </div>
        </div>
    )
}

export default Products