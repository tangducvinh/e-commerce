import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import swal from 'sweetalert'

import { InputLogin } from '../../companents'
import * as apis from '../../apis'
import { userSlice } from '../../store/userSlice'
import { validate } from '../../ultis/func'

const Personal = () => {
    const { dataCurrent } = useSelector(state => state.user)
    const [data, setData ] = useState(null)
    const [ showUpdate, setShowUpdate ] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        setData({
            name: dataCurrent?.name,
            mobile: dataCurrent?.mobile
        })
    }, [])

    useEffect(() => {
        if(data) {
            if (data?.name.localeCompare(dataCurrent?.name) !== 0 || data?.mobile.localeCompare(dataCurrent?.mobile) !== 0) {
                setShowUpdate(true)
            } else {
                setShowUpdate(false)
            }
        } 
    }, [data?.name, data?.mobile, dataCurrent?.name, dataCurrent?.mobile])

    const handleUpdateUser = async() => {
        if (showUpdate) {
            const result = validate(data)

            if (result === true) {
                const response = await apis.updateUser(data)
                swal(response.data.success ? 'Congragulation' : 'Oops', response.data.mes, response.data.success ? 'success' : 'error')
                if (response.data.success) {
                    dispatch(userSlice.actions.setDataUserCurrent(response.data.data))
                }
            } else {
                swal('Oops', result, 'error')
            }
        }
    }

    return (
        <div className='flex flex-col gap-[30px] w-full'>
            <h1 className='font-bold text-[24px] text-gray-600'>Thông tin cá nhân</h1>

            <div className='flex gap-[10px] items-center'>
                <h2 className='font-medium text-gray-500 text-[14px]'>Email</h2>
                <p>{dataCurrent?.email}</p>
            </div>

            <InputLogin value={data?.name} setValue={setData} style={'w-[50%]'} data={{label: 'Tên', placeholder: 'Nhập tên: ', name: 'name'}}/>

            <InputLogin value={data?.mobile} setValue={setData} style={'w-[50%]'} data={{label: 'Điện thoại', placeholder: 'Nhập số điện thoại: ', name: 'mobile'}} />

            <div className='w-[50%] flex justify-end'>
                <button onClick={handleUpdateUser} className={`text-white py-1 px-4 font-medium rounded-md ${showUpdate ? 'bg-main' : 'bg-slate-300'}`}>Cập nhật</button>
            </div>
        </div>
    )
}

export default Personal