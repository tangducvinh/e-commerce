import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import swal from 'sweetalert'

import { InputLogin } from '../../companents'
import { EditInfors } from '../../ultis/contants'
import * as apis from '../../apis'
import { appSlice } from '../../store/appSlice'
import icons from '../../ultis/icons'

const FormEditInfor = () => {
    const { IoClose } = icons
    const [ valueInputs, setValueInputs ] = useState({})
    const dispatch = useDispatch()
    const { idUserEdit, isChangeDataUsers } = useSelector(state => state.app)

    const fetchDataUser = async() => {
        const response = await apis.getInforUser(idUserEdit)
        setValueInputs({name: response.name, email: response.email, mobile: response.mobile})
    }

    useEffect(() => {
        fetchDataUser()
    }, [idUserEdit])

    const handleChangeInforUser = async() => {
        const response = await apis.updateUserByAdmin(valueInputs, idUserEdit)
        dispatch(appSlice.actions.setIsChangeDataUsers(!isChangeDataUsers))
        dispatch(appSlice.actions.setShowEditForm(false))
        swal(response.success ? 'Congratulations' : 'Oops', response.mes, response.success ? 'success' : 'error')
    }

    return (
        <div className='w-[700px] z-20 fixed bg-white rounded-md p-4' onClick={(e) => e.stopPropagation()}>
            <div className='flex justify-between items-center'>
                <h2 className='text-[22px] font-bold'>Thay đổi thông tin người dùng</h2>
                <span 
                    onClick={() => dispatch(appSlice.actions.setShowEditForm(false))} 
                    className='cursor-pointer'
                >
                    <IoClose size={27}/>
                </span>
            </div>

            <div className='flex gap-[35px] flex-col mt-[30px]'>
                {EditInfors.map(item => (
                    <InputLogin data={item} value={valueInputs[item.name]} setValue={setValueInputs}/>
                ))}
            </div>

            <button 
                onClick={handleChangeInforUser}
                className='text-[16px] text-white font-bold bg-main w-full py-2 rounded-md mt-[40px]'
            >
                THAY ĐỔI
            </button>
        </div>
    )
}

export default FormEditInfor