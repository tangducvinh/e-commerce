
import { useDispatch } from 'react-redux'

import icons from '../../ultis/icons'
import { appSlice } from '../../store/appSlice'

const FormEditProduct = () => {
    const dispatch = useDispatch()
    const { IoClose } = icons

    const handleHiddenForm = () => {
        dispatch(appSlice.actions.setChildren(null))
    }

    return (
        <div className='w-[700px] bg-white rounded-md p-4'>
            <div className="flex justify-center relative w-full items-center">
                <h3 className='text-[20px] font-bold text-gray-700'>Sửa sản phẩm</h3>

                <button onClick={handleHiddenForm} className='absolute right-[5px]'><IoClose size={30} /></button>
            </div>
        </div>
    )
}

export default FormEditProduct