

import Paypal from './Paypal'
import { withBaseCompanent } from '../../hocs/withBaseCompanent'
import { appSlice } from '../../store/appSlice'
import icons from '../../ultis/icons'
import { productSlice } from '../../store/productSlice'

const FormPaymentMethod = ({dispatch, amount, products, note}) => {
    const { IoClose } = icons

    return (
        <div
            onClick={(e) => e.stopPropagation()} 
            className='w-[700px] bg-white rounded-md p-4'>
            <div className="flex justify-center relative w-full items-center mb-[40px]">
                <h3 className='text-[20px] font-bold text-gray-700'>Lựa chọn phương thức thanh toán</h3>

                <button 
                    onClick={() => dispatch(appSlice.actions.setChildren(null))}
                    className='absolute right-[5px] hover:text-main'><IoClose size={30} 
                /></button>
            </div>

            <div className='flex justify-center'>
                <div className='w-[300px]'>
                    <Paypal amount={Math.round(amount / 24000)} products={products} note={note} ></Paypal>
                </div>
            </div>
        </div>
    )
}

export default withBaseCompanent(FormPaymentMethod)