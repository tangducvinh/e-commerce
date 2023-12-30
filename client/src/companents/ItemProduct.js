

import icons from '../ultis/icons'

const ItemProduct = () => {
    const { FaStar, FaRegHeart } = icons

    return (
        <div className="flex flex-col bg-white rounded-xl w-[20%] p-3 relative">
            <div className="flex justify-center mt-2">
                <img className="w-[160px] h-[160px] object-cover" alt="product" src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/t/e/tecno-pova-5_2__1.png"></img>
            </div>

            <div className="px-3 py-1 rounded-l-sm absolute top-0 left-[-5px] bg-main rounded-r-xl flex justify-center items-center">
                <span className="text-white text-[12px] font-[700]">{`Giảm ${50}%`}</span>
            </div>

            <div className="mt-2 gap-4 flex flex-col">
                <p className="text-[#444444] font-[500]">Samsuzng Galaxy Tab S9 Ultra 12GB 256GB - Chỉ có tại CellphoneS</p>

                <div className="flex gap-1 font-[500]">
                    <p className="font-[16px] text-[#D70018]">4.490.000</p>
                    {/* <p className="font-sm text-[#707070]">5.290.000</p> */}
                    <p className="font-sm text-[#707070] line-through">5.290.000</p>
                </div>

                <div className="flex justify-between mt-auto items-center">
                    <div className="flex gap-1">
                        <FaStar color='#F59E0B' />

                        <FaStar color='#F59E0B' />

                        <FaStar color='#F59E0B' />
                        <FaStar color='#F59E0B' />
                        <FaStar color='#F59E0B' />
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-[12px] text-[#777777]">Yêu thích</span>
                        <FaRegHeart size={20} color="#A10A04"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ItemProduct