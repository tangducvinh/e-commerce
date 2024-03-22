import { useState, useEffect, useRef } from 'react'
import icons from '../../ultis/icons'
import { appSlice } from '../../store/appSlice'
import { useSelector } from 'react-redux'
import { userSlice } from '../../store/userSlice'

import { withBaseCompanent } from '../../hocs/withBaseCompanent'
import { ItemProductSearch } from '../../companents'
import * as apis from '../../apis'
import path from '../../ultis/path'
import { createSearchParams } from 'react-router-dom'

const InputSearchHeader = ({ dispatch, navigate }) => {
    const { MdOutlineCancel, HiOutlineSearch, IoTimeOutline, GoTrash } = icons
    const [ valueSearch, setValueSearch ] = useState(null)
    const { showOverlay } = useSelector(state => state.app)
    const [ dataQuickSearch, setDataQuickSearch ] = useState(null)
    const { dataCurrent } = useSelector(state => state.user)
    const parentElement = useRef()

    const getDataProductSearch = async(data) => {
        const response = await apis.getProductSearch(data)

        if (response.data.success) {
            setDataQuickSearch(response.data.data)
        }
    }

    useEffect(() => {
        if (valueSearch) {
            getDataProductSearch({title: valueSearch})
        } else {
            setDataQuickSearch(null)
        }
    }, [valueSearch])

    const handleNavigateToPageSearch = async(value) => {
        navigate({
            pathname: `/${path.PRODUCTS}`,
            search: createSearchParams({
                title: value
            }).toString()
        })
        dispatch(appSlice.actions.setShowOverlay(false))

        const response = await apis.addListSearched({title: value})
        if (response.data.success) {
            dispatch(userSlice.actions.setDataUserCurrent(response.data.data))
        }
    }

    const handleListenKey = async(e) => {
        if (e.key === 'Enter') {
            if(valueSearch) {
                await handleNavigateToPageSearch(valueSearch)
            }
        }
    }

    const handleSearchKeyWord = async(value) => {
        await handleNavigateToPageSearch(value)
    }

    useEffect(() => {
        const handleHiddenInforSearch = (e) => {
            const result = parentElement.current.contains(e.target)

            if (!result) {
                dispatch(appSlice.actions.setShowOverlay(false))
            } else {
                dispatch(appSlice.actions.setShowOverlay(true))
            }
        }

        document.addEventListener('click', handleHiddenInforSearch)

        return () => document.removeEventListener('click', handleHiddenInforSearch)
    }, [])

    const handleDeleteAllTitleSearched = async() => {
        const response = await apis.removeAllTitleSearched()
        
        if(response.data.success) {
            dispatch(userSlice.actions.setDataUserCurrent(response.data.data))
        }
    }

    return (
        <div ref={parentElement} className="flex relative justify-center items-center">
            <button className="h-[34px] bg-white rounded-l-xl pl-2">
                <HiOutlineSearch size={20}/>
            </button>

            <input 
                onKeyDown={e => handleListenKey(e)}
                className="h-[34px] w-[279px] rounded-r-xl pl-1 outline=none placeholder:text-[16px] outline-none" 
                placeholder="Bạn cần tìm gì?"
                value={valueSearch}
                onChange={(e) => setValueSearch(e.target.value)}
            ></input>

            {valueSearch && <span onClick={() => setValueSearch('')} className="absolute right-2 cursor-pointer"><MdOutlineCancel /></span>}

            {showOverlay && 
                <div className='w-[500px] bg-white absolute top-[140%] overflow-hidden rounded-md left-0 pb-2'>
                    {!dataQuickSearch ? 
                        <div className='p-3 min-h-[150px]'>
                            <div className='flex justify-between'>
                                <div className='flex items-center gap-2'>
                                    <p className='text-[16px] text-[#4A4A4A]'>Lịch sử tìm kiếm</p>
                                    <IoTimeOutline size="17px" />
                                </div>

                                {dataCurrent?.searcheds.length > 0 && 
                                    <div className='flex items-center gap-2'>
                                        <button onClick={handleDeleteAllTitleSearched} className='text-[#86888D] text-[16px] hover:underline'>Xoá tất cả</button>
                                        <GoTrash size='17px' />
                                    </div>
                                }
                            </div>

                            {dataCurrent?.searcheds?.length === 0 ?
                                    <p className='text-[#86888D] mt-2 text-[14px]'>Hãy thực hiện tìm kiếm</p>
                                :
                                <ul className='mt-2 flex-col flex gap-1'>
                                    {dataCurrent?.searcheds && 
                                        [...dataCurrent.searcheds]?.reverse()?.map((item, index) => (
                                            <li 
                                                key={index} 
                                                onClick={() => handleSearchKeyWord(item)}
                                                className='text-[#86888D] text-[14px] hover:underline hover:cursor-pointer'
                                            >{item}</li>
                                        ))
                                    }
                                </ul>
                            }
                        </div>    
                        :
                        <div>
                            <p className='text-[#4A4A4A] bg-[#F3F3F3] text-[16px] px-2 py-1'>Sản phẩm gợi ý</p>

                            <ul>
                                {dataQuickSearch?.filter((el, index) => index < 5).map(item => (
                                    <li className='px-3 py-2 hover:bg-[#f0f0f0]'> 
                                        <ItemProductSearch 
                                            image={item.images[0]} 
                                            title={item.title} 
                                            price={item.price.price} 
                                            sale={item.price.sale}
                                            pid={item._id}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    }

                </div>
            }
        </div>
    )
}

export default withBaseCompanent(InputSearchHeader)