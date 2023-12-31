import { Link } from 'react-router-dom'
import { memo, useState, useEffect } from 'react'
import swal from 'sweetalert'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { InputLogin } from '../../companents'
import * as apis from '../../apis'
import path from '../../ultis/path'
import { userSlice } from '../../store/userSlice'

const Register = ({ data }) => {
    const [ value, setValue ] = useState({})
    const navigate = useNavigate()
    const [ saveRegister, setSaveRegister ] = useState()
    const dispatch = useDispatch()

    useEffect(() => {
        if (saveRegister) setValue(saveRegister)
        else setValue(data.initData)
    }, [data])

    const handleSubmit = async() => {
        const { confirmPassword, introduce, ...rest} = value

        if (data.id === 1) {
            if (value.confirmPassword !== value.password ) {
                swal("Thất bại", "Mật khẩu xác thực lại không trùng khớp", "error")
            } else {
                const response = await apis.register(rest)
                swal(response?.success ? 'Congratulation' : 'Oops', response?.mess, response?.success ? 'success' : 'error')

                // if (response?.success) {
                //     navigate(`/${path.LOGIN}`)
                //     setSaveRegister({email: rest.email, password: rest.password})
                // }
            }
        } else {
            const response = await apis.login(rest)

            if (!response.success) swal("Thất bại", "Thông tin đăng nhập không đúng", "error")
            else {
                dispatch(userSlice.actions.register({isLoggedIn: true, userData: response.userData, token: response.accessToken}))
                navigate(`/${path.HOME}`)
            }
        }
    }

    return (
        <div>
            <div className="flex justify-center flex-col items-center">
                <Link to={data?.navigate} className="flex mt-5 justify-star h-[30px] w-[700px]">{data?.icon}</Link>

                <div 
                    className="flex flex-col items-center pb-[50px] pt-5 w-[700px]"
                >
                    <img className="w-[100px] h-[100px] object-cover" src={data?.image}></img>
                    <p className="font-bold text-[#4A4A4A] text-[23px]">{data?.title}</p>
                    
                    <div className='flex flex-col gap-10 w-full mt-10 relative'>
                        {data?.options.map((item, index) => (
                            <InputLogin data={item} value={Object.values(value)[index]} key={index} setValue={setValue}/>
                        ))}
                    </div>

                    <span className="w-full flex justify-end mt-2 text-[13px] text-[#777777] mr-2">{data.forgot}</span>

                    {data?.clause && 
                        data?.clause?.map((item, index) => (
                            <div className="text-[13px] text-[#777777] w-full mt-6 flex items-center" key={index}>
                                <input className="mr-1" type='checkbox' id={index}></input>
                                <label htmlFor={index} className="select-none">{item}</label>
                            </div>
                        ))
                    }

                    <button onClick={handleSubmit} className="mt-8 bg-main w-full p-3 rounded-md text-white font-[500]">{data?.name}</button>

                    <div className="flex items-center mt-8 w-full">
                        <span className="flex-1 border-[1px]"></span>
                        <p className="mx-1 font-4 text-[#4A4A4A]">{data?.description}</p>
                        <span className="flex-1 border-[1px]"></span>
                    </div>

                    <div className="mt-8 flex items-center text-[14px]">
                        <p className="text-[#777777] mr-1">{data?.question}</p>
                        <Link to={data?.navigate} className="text-main font-[500]">{data?.require}</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(Register)