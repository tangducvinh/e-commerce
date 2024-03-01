import { memo, useState } from 'react'
import swal from 'sweetalert'
import { useDispatch } from 'react-redux'

import icons from '../../ultis/icons'
import avatar from '../../assets/imgs/avatar.png'
import { rules } from '../../ultis/contants'
import * as apis from '../../apis'
import { appSlice } from '../../store/appSlice'

const InforUserItem = ({ name, email, mobile, role, status, uid, handleChangeData }) => {   
    const { BsThreeDots } = icons
    const [ show, setShow ] = useState(false)
    const dispatch = useDispatch()

    const handleDeleteUser = async() => {
        swal({
            title: 'Xác nhận',
            text: 'Bạn có thật sự muốn xoá tài khoản này?',
            buttons: true,
        }).then(async(result) => {
            if (result) {
                const response = await apis.deleteUser({_id: uid})
                swal(response.success ? 'Congratulations' : 'Opps', response.mes, response.success ? 'success' : 'error')
                handleChangeData()
            }
        })
    }

    const handleEditUser = () => {
        dispatch(appSlice.actions.setShowEditForm(true))
        dispatch(appSlice.actions.setIdUserEdit(uid))
    }

    return (
        <div className={`flex items-center pl-2 border-l-[6px] rounded-md shadow-md py-2 ${role === '7' ? 'border-main' : role === '3' ? 'border-green-600' : 'border-blue-600'}`}>
            <div className='w-[45px]'>
                <img src={avatar} alt='avatar' className='w-8 h-8 rounded-full'></img>
            </div>
            <span className='flex-2 text-[14px] font-[500]'>{name}</span>
            <span className='flex-2 text-[14px] font-[500]'>{email}</span>
            <span className='flex-2 text-[14px] font-[500]'>{mobile}</span>
            <span className='flex-2 text-[14px] font-[500]'>{rules.find(el => el.role === role).value}</span>
            <span className={`flex-2 text-[14px] font-[500] ${!status ? 'text-green-600' : 'text-red-600'}`}>{!status ? 'HOẠT ĐỘNG' : 'BỊ CHẶN'}</span>
            <div onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)} className='relative w-[35px] cursor-pointer h-[35px] flex items-center justify-center mr-2 rounded-full hover:bg-gray'>
                <BsThreeDots size={20} />

                {show && 
                    <div className='absolute w-[100px] bg-slate-100 shadow-md top-[35px] rounded-md flex flex-col z-10'>
                        <button onClick={handleEditUser} className='py-1 px-4 font-[500] border border-transparent hover:border rounded-md hover:border-gray-500'>Sửa</button>
                        <button onClick={handleDeleteUser} className='py-1 px-4 font-[500] border border-transparent hover:border rounded-md hover:border-gray-500'>Xoá</button>
                    </div>
                }
            </div>
        </div>
    )   
}

export default memo(InforUserItem)