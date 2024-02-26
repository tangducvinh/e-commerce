

import { ItemProductMyCart } from '../../companents'
import { withBaseCompanent } from '../../hocs/withBaseCompanent'

const MyCart = (pros) => {
    return (
        <div>
            <h1 className='font-bold text-[24px] text-gray-600'>Giỏ hàng của bạn</h1>

            <div className='mt-[20px]'>
                <ItemProductMyCart />
            </div>
        </div>
    )
}

export default withBaseCompanent(MyCart)