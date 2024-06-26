import { memo } from 'react'

import { ItemProductOrdered } from '../../companents' 


const ItemOrder = ({data}) => {
    const date = new Date(data?.updatedAt)

    return (
        <div className='w-full border-[1px] border-gray-300 p-4 rounded-md'>
            <div className='flex items-center gap-8 px-4 py-6 rounded-md border-b-[1px] border-gray-300'>
                <div className='flex flex-shrink-0 flex-col items-center'>
                    <p className='text-[14px] font-medium'>Mã hoá đơn</p>
                    <p className='text-[14px] text-slate-500'>{`#${data?.indexOrder}`}</p>
                </div>

                <div className='flex flex-shrink-0 flex-col items-center' >
                    <p className='text-[14px] font-medium'>Ngày mua</p>
                    <p className='text-[14px] text-slate-500'>{`${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`}</p>
                </div>

                <div className='flex flex-shrink-0 flex-col items-center'>
                    <p className='text-[14px] font-medium'>Tổng tiền</p>
                    <p className='text-[16px] font-medium text-main'>{data.total.toLocaleString('it-IT', {style: 'currency', currency: 'VND'})}</p>
                </div>

                {data?.note && 
                    <div className='max-w-[500px]'>
                        <p className='text-[14px] line-clamp-2 text-slate-500'>{`Ghi chú: ${data?.note}`}</p>
                    </div>
                }
            </div>

            <div className='flex flex-col gap-8 pt-5'>
                {data.products.map((item, index) => (
                    <ItemProductOrdered 
                        image={item.product.images[0]}
                        name={item.product.title}
                        price={item.product.price.sale || item.product.price.price}
                        color={item.color}
                        quantity={item.quantity}
                        pid={item.product._id}
                    />
                ))}
            </div>
        </div>
    )
}

export default memo(ItemOrder)