import { useSelector } from 'react-redux'

import { ItemProduct, EmptyPage } from '../../companents'

const Wishlist = () => {
    const { dataCurrent } = useSelector(state => state.user)

    return (
       <div className='w-full'>
            {dataCurrent?.wishlist?.length === 0 ?
                <div className='mt-10'><EmptyPage /></div>    
                :
                <div>
                    <h1 className='font-bold text-[24px] text-gray-600'>Danh sách các sản phẩm yêu thích của bạn</h1>

                    <div className='flex w-full flex-wrap ml-[-8px]'>
                        {dataCurrent?.wishlist?.map((item) => (
                            <div className='ml-2 w-four mb-4'>
                                <ItemProduct 
                                    image={item.images[0]}
                                    title={item.title}
                                    price={item.price.price}
                                    sale={item.price.sale}
                                    star={Number(item?.totalRatings?.rate) || Number(item?.totalRatings?.rate?.split('')[0])}
                                    pid={item._id}
                                    favorite={dataCurrent?.wishlist.some(el => el._id === item._id)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            }
            <div className='h-[20px]'></div>
       </div>
    )
}

export default Wishlist