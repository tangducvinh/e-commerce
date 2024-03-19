import { useState } from 'react'

import icons from '../../ultis/icons'
import email from '../../assets/imgs/email icon.png'
import { appSlice } from '../../store/appSlice'
import { withBaseCompanent } from '../../hocs/withBaseCompanent'
import * as apis from '../../apis'

const FormConfirmRegister = ( { dispatch }) => {
    const { IoClose} = icons
    const [ value, setValue ] = useState('')

    const handleClickConfirm = async() => {
        if (value) {
            const response = await apis.finalRegister({code: value})
            console.log(cookies)
            console.log(response)

        }
    }

    return (
        <div onClick={(e) => e.stopPropagation()} className='bg-white w-[600px] p-3 pb-[50px] rounded-md'>
            <div className='flex justify-end'>
                <button onClick={() => dispatch(appSlice.actions.setChildren(null))} className='hover:text-main'><IoClose size={30} /></button>
            </div>

            <div className='flex flex-col items-center'>
                <img className='h-[150px] w-[150px] object-cover' src={email} alt='email'></img>

                <p className='font-medium mt-4 text-[16px]'>Nhập mã xác từ email của bạn</p>

                <input value={value} onChange={(e) => setValue(e.target.value)} placeholder='Nhập mã xác nhận' className='w-[200px] px-2 placeholder:text-[15px] h-[40px] border-[1px] rounded-md mt-4'></input>

                <button onClick={handleClickConfirm} className='rounded-md mt-4 bg-green-600 px-6 py-2 text-white'>Xác nhận</button>
            </div>
        </div>
    )
}

export default withBaseCompanent(FormConfirmRegister)
