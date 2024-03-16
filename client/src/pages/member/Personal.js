import { useSelector } from 'react-redux'
import { useState, useEffect, useCallback } from 'react'
import swal from 'sweetalert'

import { InputLogin, FormAddAddress } from '../../companents'
import * as apis from '../../apis'
import { userSlice } from '../../store/userSlice'
import { validate } from '../../ultis/func'
import icons from '../../ultis/icons'
import { withBaseCompanent } from '../../hocs/withBaseCompanent'
import { appSlice } from '../../store/appSlice'

const Personal = ({ dispatch }) => {
    const { dataCurrent } = useSelector(state => state.user)
    const [ data, setData ] = useState(null)
    const [ showUpdate, setShowUpdate ] = useState(false)
    const { MdAssignmentAdd, IoClose, FaCircleCheck } = icons
    const [ checkAddress, setCheckAddress ] = useState(null)

    useEffect(() => {
        dataCurrent?.address.forEach((item, index) => {
            if (item?.street.localeCompare(dataCurrent.addressDefault?.street) === 0
                && item?.city.localeCompare(dataCurrent.addressDefault?.city) === 0
                && item?.ward.localeCompare(dataCurrent.addressDefault?.ward) === 0
                && item?.county.localeCompare(dataCurrent.addressDefault?.county) === 0
            ) {
                setCheckAddress(() => index)
            }
        })
        setData({
            name: dataCurrent?.name,
            mobile: dataCurrent?.mobile,
            address: dataCurrent?.address.map(item => ({city: item.city, county: item.county, ward: item.ward, street: item.street}))
        })
    }, [dataCurrent])

    useEffect(() => {
        if(data) {
            const newArray = dataCurrent.address.map(item => ({city: item.city, county: item.county, ward: item.ward, street: item.street}))

            if (data?.name.localeCompare(dataCurrent?.name) !== 0 
                || data?.mobile.localeCompare(dataCurrent?.mobile) !== 0
                || JSON.stringify(dataCurrent.addressDefault) !== (JSON.stringify(data.address[checkAddress] || null))
                || JSON.stringify(newArray) !== JSON.stringify(data.address)
            ) {
                setShowUpdate(true)
            } else {
                setShowUpdate(false)
            }
        } 
    }, [data, checkAddress, dataCurrent])

    const handleUpdateUser = async() => {
        if (showUpdate) {
            const result = validate({name: data.name, mobile: data.mobile})

            if (result === true) {
                if (checkAddress !== null) {
                    data.addressDefault = data.address[checkAddress]
                } else {
                    data.addressDefault = null
                } 
                
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

    const handleClickAddAddress = () => {
        dispatch(appSlice.actions.setChildren(<FormAddAddress onAddAddress={handleAddAddress}/>))
    }   

    const handleAddAddress = useCallback((value) => {
        const newData = [...data.address]
        newData.push(value)
        setData(prev => ({...prev, address: newData}))
    }, [data?.address])

    const handleDeleteAddress = (index) => {
        const newData = [...data.address]
        newData.splice(index, 1)
        setData(prev => ({...prev, address: newData}))
        if (index === checkAddress) setCheckAddress(null)
    }

    const handleClickFixAddress = (data, index) => {
        dispatch(appSlice.actions.setChildren(<FormAddAddress data={data} index={index} onAddAddress={handleFixAddress}/>))
    }

    const handleFixAddress = useCallback((value, index) => {
        const newArray = [...data.address]
        newArray.splice(index, 1, value)
        setData(prev => ({...prev, address: newArray}))
    }, [data?.address])

    return (
        <div className='flex flex-col gap-[30px] w-full'>
            <h1 className='font-bold text-[24px] text-gray-600'>Thông tin cá nhân</h1>

            <div className='flex gap-[10px] items-center'>
                <h2 className='font-medium text-gray-500 text-[14px]'>Email</h2>
                <p>{dataCurrent?.email}</p>
            </div>

            <InputLogin value={data?.name} setValue={setData} style={{css: 'w-[50%]'}} data={{label: 'Tên', placeholder: 'Nhập tên: ', name: 'name'}}/>

            <InputLogin value={data?.mobile} setValue={setData} style={{css: 'w-[50%]'}} data={{label: 'Điện thoại', placeholder: 'Nhập số điện thoại: ', name: 'mobile'}} />

            <div className='w-[50%]'>
                <div className='mb-3'>
                    <h2 className='font-medium text-gray-500 text-[14px]'>{'Địa chỉ (mặc định)'}</h2>
                    {checkAddress !== null && dataCurrent?.addressDefault ?
                        <p className='text-[14px]'>{`${data?.address[checkAddress]?.street}, ${data?.address[checkAddress]?.ward}, ${data?.address[checkAddress]?.county}, ${data?.address[checkAddress]?.city}`}</p>
                        : <p className='text-[14px]'>{'Chưa có địa chỉ mặc định'}</p>
                    }
                </div>
                <div className='flex flex-col gap-2'>
                    {data?.address.map((item, index) => (
                        <div key={item._id} className='flex items-center gap-2'>
                            <button 
                                onClick={() => setCheckAddress(index)}
                                className='w-[15px] h-[15px] rounded-full border-[1px] relative'
                            >
                                {checkAddress === index && <span className='text-main absolute inset-0'><FaCircleCheck /></span>}
                            </button>
                            <p className='text-[14px] flex flex-1'>{`${item.street}, ${item.ward}, ${item.county}, ${item.city}`}</p>
                            <button onClick={() => handleDeleteAddress(index)} className='hover:text-main'><IoClose size='17px' /></button>
                            <button onClick={() => handleClickFixAddress(item, index)}><MdAssignmentAdd size='16px'/></button>
                        </div>
                    ))}
                </div>

                <button 
                    onClick={handleClickAddAddress} 
                    className='bg-blue-400 text-[13px] mt-2 hover:bg-blue-500 rounded-md text-white py-1 px-2'
                >Thêm địa chỉ</button>
            </div>

            <div className='w-[50%] flex justify-end'>
                <button onClick={handleUpdateUser} className={`text-white py-1 px-4 font-medium rounded-md ${showUpdate ? 'bg-main' : 'bg-slate-300'}`}>Cập nhật</button>
            </div>
        </div>
    )
}

export default withBaseCompanent(Personal)