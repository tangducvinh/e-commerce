import { useState } from 'react'
import swal from 'sweetalert'
import { useParams, useNavigate } from 'react-router-dom'

import { changePassword } from '../../apis'
import { InputLogin } from '../../companents'
import path from '../../ultis/path'

const ChangePassword = () => {
    const { token } = useParams()
    const navigate = useNavigate()
    const data = [
        {
            placeholder: 'Nhập mật khẩu mới',
            name: 'password',
            label: 'MẬT KHẨU MỚI'
        },
        {
            placeholder: 'Nhập xác nhận mật khẩu',
            name: 'confirmPassword',
            label: 'XÁC NHẬN MẬT KHẨU',
        }
    ]

    const [ value, setValue ] = useState({password: '', confirmPassword: ''})

    const handleSubmid = async() => {
        if (value.password !== value.confirmPassword) {
            swal('Opps', 'Mật khẩu xác thực không trùng khớp vui lòng thử lại', 'error')
        } else {
            const data = {
                token,
                password: value.password
            }

            const response = await changePassword(data)

            swal(response.success ? 'Congratulation' : 'Opps', response.mes, response.success ? 'success' : 'error').then(() =>{
                navigate(`/${path.ACCOUNT}/${path.LOGIN}`)
            })
        }
    }

    return (
        <div className='flex justify-center'>
            <div className='w-[700px] flex flex-col items-center'>
                <div className='flex items-center w-full mt-10'>
                    <h1 className='w-full text-center text-[#4A4A4A] text-[22px] font-bold'>Thiết lập mật khẩu mới</h1>
                </div>

                <img className='w-[213px] h-[213px] object-cover mt-7' src='https://account.cellphones.com.vn/_nuxt/img/Shipper_CPS3.77d4065.png' alt='icon'></img>
                
                <div className="flex flex-col gap-8 w-full mt-10">
                    {data.map((item, index) => (
                        <InputLogin data={item} value={Object.values(value)[index]} setValue={setValue} key={index}/>
                    ))}
                </div>

                <div onClick={handleSubmid} className="flex justify-center items-center text-[16px] font-[600] text-white py-3 w-full bg-main mt-8 rounded-md">Thay đổi</div>
            </div>
        </div>
    )
}

export default ChangePassword