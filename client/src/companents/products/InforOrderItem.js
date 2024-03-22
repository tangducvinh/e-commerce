import moment from 'moment'

const InforOrderItem = ({data}) => {
    return (
        <div className='text-[15px] flex gap-4 items-center font-[500] text-gray-700 border-b-[1px] px-3 py-3 rounded-md'>
            <span className='w-[80px]'>{`#${data.indexOrder}`}</span>
            <span className='flex-1'>{data.orderBy?.name}</span>
            <div className='flex-2'>
                {data.products.length === 1 ?
                    <span>{data.products[0].product.title}</span>
                    :
                    data.products.map((item, index) => (
                        <p className='line-clamp-1'>{item.product.title}</p>
                    ))
                }
            </div>
            <span className='flex-1'>{moment(data.updatedAt).format('DD/MM/YYYYY')}</span>
            <span className='flex-1 text-main'>{data.total.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</span>
            <span className='flex-1 '>
                <span className='bg-green-100 flex-none py-1 px-2 rounded-md text-green-700'>Đã thanh toán</span>    
            </span>
            <span className='flex-1'>{`Paypal`}</span>
        </div>
    )
}

export default InforOrderItem