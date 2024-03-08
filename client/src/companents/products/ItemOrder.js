import { memo } from 'react'

import { ItemProductOrdered } from '../../companents' 


const ItemOrder = ({data}) => {
    console.log(data)

    const date = new Date(data?.updatedAt)


    return (
        <div className='w-full border-[1px] p-4 rounded-md'>
            <div className='flex items-center gap-8 px-4 py-6 rounded-md border-b-[1px]'>
                <div className='flex flex-col items-center'>
                    <p className='text-[14px] font-medium'>Mã hoá đơn</p>
                    <p className='text-[14px] text-slate-500'>{`#${data?.indexOrder}`}</p>
                </div>

                <div className='flex flex-col items-center' >
                    <p className='text-[14px] font-medium'>Ngày mua</p>
                    <p className='text-[14px] text-slate-500'>{`${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`}</p>
                </div>

                <div className='flex flex-col items-center'>
                    <p className='text-[14px] font-medium'>Tổng tiền</p>
                    <p className='text-[16px] font-medium text-main'>{data.total.toLocaleString('it-IT', {style: 'currency', currency: 'VND'})}</p>
                </div>
            </div>

            <div className='flex flex-col gap-8 pt-5'>
                {data.products.map((item, index) => (
                    <ItemProductOrdered 
                        image={item.product.images[0]}
                        name={item.product.title}
                        price={item.product.price.sale || item.product.price.price}
                        color={item.color}
                        quantity={item.quantity}
                    />
                ))}
            </div>
        </div>
    )
}

export default memo(ItemOrder)