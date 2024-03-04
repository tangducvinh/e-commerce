import { useState, memo } from 'react'

import { InputLogin } from '../../companents'
import icons from '../../ultis/icons'
import { withBaseCompanent } from '../../hocs/withBaseCompanent'
import { appSlice } from '../../store/appSlice'
import swal from 'sweetalert'

const FormAddAddress = ({ dispatch, onAddAddress, data = {city: '', county: '', ward: '', street: ''}, index }) => {
    const { IoClose } = icons 
    const [ value, setValue ] = useState(data)


    const handleSubmid = () => {
        if (value.city && value.county && value.street && value.ward) {
            onAddAddress(value, index)
            dispatch(appSlice.actions.setChildren(null))
        } else {
            swal('Opps', 'Vui lòng nhập đầy đủ thông tin', 'warning')
        }
    }

    return (
        <div 
            onClick={(e) => e.stopPropagation()}
            className='bg-white w-[600px] rounded-md p-4'
        >
            <div className="flex justify-center relative w-full items-center">
                <h3 className='text-[20px] font-bold text-gray-700'>Thêm địa chỉ</h3>

                <button 
                    onClick={() => dispatch(appSlice.actions.setChildren(null))}
                    className='absolute right-[5px] hover:text-main'><IoClose size={30} 
                /></button>
            </div>

            <div className='p-4 pt-10 flex flex-col gap-[30px] mt-2'>
                <div className='flex gap-[20px] items-center'>
                    <InputLogin 
                        value={value.city} 
                        setValue={setValue} 
                        data={{label: 'TỈNH / THÀNH PHỐ', name: 'city', placeholder: 'Nhập tỉnh/thành phố : '}} 
                        style={{css: 'w-[50%]', color: 'border-blue-600', label: 'text-blue-600'}}
                    />
                    <InputLogin 
                        value={value.county} 
                        setValue={setValue} 
                        data={{label: 'QUẬN / HUYỆN', name: 'county', placeholder: 'Nhập quận/huyện: '}} 
                        style={{css: 'w-[50%]', color: 'border-blue-600', label: 'text-blue-600'}}
                    />
                </div>
                <div className='flex gap-[20px] items-center'>
                    <InputLogin 
                        value={value.ward} 
                        setValue={setValue} 
                        data={{label: 'PHƯỜNG / XÃ', name: 'ward', placeholder: 'Nhập phường/xã: '}} 
                        style={{css: 'w-[50%]', color: 'border-blue-600', label: 'text-blue-600'}}
                    />
                    <InputLogin 
                        value={value.street} 
                        setValue={setValue} 
                        data={{label: 'ĐỊA CHỈ', name: 'street', placeholder: 'Số nhà, tên đường: '}} 
                        style={{css: 'w-[50%]', color: 'border-blue-600', label: 'text-blue-600'}}
                    />
                </div>

                <button 
                    onClick={handleSubmid}
                    className='bg-main rounded-md py-2 mt-5 text-white'
                >Cập nhật địa chỉ</button>
            </div>
        </div>
    )
}

export default withBaseCompanent(memo(FormAddAddress))