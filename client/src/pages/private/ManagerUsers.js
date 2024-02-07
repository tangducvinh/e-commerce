import { useState, useEffect, useCallback } from 'react'
import { useDebounce } from 'use-debounce'
import { useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import * as apis from '../../apis'
import icons from '../../ultis/icons'
import { InforUserItem, InputSearch, Pagiantion } from '../../companents'

const ManageUsers = () => {
    const [ dataUsers, setDataUsers ] = useState([])
    const { HiUserAdd } = icons
    const [ valueSearch, setValueSearch ] = useState('')
    const [ value ] = useDebounce(valueSearch, 800)
    const [ getParams ] = useSearchParams()
    const [ checkChangeData, setCheckChangeData ] = useState(false)
    const { isChangeDataUsers } = useSelector(state => state.app)

    const fecthDataUsers = async(params) => {
        const response = await apis.getAllUsers(params)
        if (response.success) setDataUsers(response)
    }

    useEffect(() => {
        const paramsSearch = Object.fromEntries([...getParams])

        if (value) paramsSearch.q = value
        fecthDataUsers({...paramsSearch})
    }, [value, getParams, checkChangeData, isChangeDataUsers])

    const setValue = useCallback((value) => {
        setValueSearch(value)
    }, [valueSearch])

    const handleChangeData = useCallback(() => {
        setCheckChangeData(prev => !prev)
    }, [checkChangeData])

    return (
        <div className='realtive'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-[30px] text-gray-600'>
                    <h3 className='text-[24px]'>Manage Users</h3>
                    <span className='text-[13px] font-[700]'>{`${dataUsers.counts} total`}</span>
                </div>

                <div className='flex items-center justify-between gap-5'>
                    <InputSearch setValueSearch={setValue} valueSearch={valueSearch}/>

                    <button className='bg-blue-500 text-[#ffff] gap-2 flex py-2 px-4 rounded-md'>
                        <HiUserAdd size={20}/>
                        <span className='text-[14px]'>Thêm</span>
                    </button>
                </div>
            </div>
            <div className='mt-[30px]'>
                <div className='flex items-center pl-3'>
                    <div className='w-[45px]'></div>
                    <span className='flex-2 font-[500] text-gray-600'>Tên</span>
                    <span className='flex-2 font-[500] text-gray-600'>Email</span>
                    <span className='flex-2 font-[500] text-gray-600'>SĐT</span>
                    <span className='flex-2 font-[500] text-gray-600'>Role</span>
                    <span className='flex-2 font-[500] text-gray-600'>Tình trạng</span>
                    <div className='w-[45px]'></div>
                </div>

                <div className='mt-2'>
                    {dataUsers?.data?.map((item) => (
                        <div key={item._id} className='mb-3'>
                            <InforUserItem name={item.name} email={item.email} status={item.status} mobile={item?.mobile} role={item.role} uid={item._id} handleChangeData={handleChangeData}/>
                        </div>
                    ))}
                </div>
            </div>

            <div className='mt-10 flex justify-center'>
                <Pagiantion totalProductCount={dataUsers.counts}/>
            </div>

            <div className='h-[50px]'></div>
        </div>
    )
}

export default ManageUsers