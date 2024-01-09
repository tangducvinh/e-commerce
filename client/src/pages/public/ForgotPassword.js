import { useState } from 'react'
import { Link } from 'react-router-dom'
import swal from 'sweetalert'

import icons from '../../ultis/icons'
import { InputLogin } from '../../companents'
import path from '../../ultis/path'
import { forgotPassword } from '../../apis'

const ForgotPassword = () => {
    const { GoArrowLeft } = icons

    const data = {
        placeholder: 'Nhập email',
        label: 'Email',
        name: 'email',
    }

    const [ value, setValue ] = useState({email: ''})

    const handleSubmid = async() => {
        const response = await forgotPassword(value)

        swal(response.success ? 'Congratulation' : 'Oops', response.mes, response.success ? 'success' : 'error')
    }

    return (
        <div className='flex justify-center'>
            <div className='flex-col w-[700px] py-4 flex items-center'>
                <div className='flex items-center w-full'>
                    <Link to={`/${path.LOGIN}`} ><GoArrowLeft size={30}/></Link>
                    <h1 className='w-full text-center text-[#4A4A4A] text-[22px] font-bold pr-[30px]'>Quên mật khẩu</h1>
                </div>

                <img className='w-[213px] h-[213px] object-cover mt-7' src='https://account.cellphones.com.vn/_nuxt/img/Shipper_CPS3.77d4065.png' alt='icon'></img>

                <div className='w-full mt-5'>
                    <p className="text-[12px] text-[#777777] mb-4">Xác thực email để thay đổi mật khẩu mới</p>
                    <InputLogin data={data} value={value.email} setValue={setValue}/>
                </div>

                <div onClick={handleSubmid} className='flex items-center justify-center text-[14px] font-[600] text-white bg-main w-full py-3 rounded-md mt-10'>Tiếp tục</div>
            </div>
        </div>
    )
}

export default ForgotPassword