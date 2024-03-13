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

    const getDataProductSearch = async(data) => {
        const response = await apis.getProductSearch(data)

        if (response.data.success) {
            setDataQuickSearch(response.data.data)
        }
    }

    console.log(dataCurrent)
    useEffect(() => {
        if (valueSearch) {
            getDataProductSearch({title: valueSearch})
        } else {
            setDataQuickSearch(null)
        }
    }, [valueSearch])

    const handleClickInput = () => {
        dispatch(appSlice.actions.setShowOverlay(true))
    }

    const handleListenKey = (e) => {
        if (e.key === 'Enter') {

            if(valueSearch) {
                navigate({
                    pathname: `/${path.PRODUCTS}`,
                    search: createSearchParams({
                        title: valueSearch
                    }).toString()
                })
                dispatch(appSlice.actions.setShowOverlay(false))
            }

        }
    }

    return (
        <div className="flex relative justify-center items-center">
            <button className="h-[34px] bg-white rounded-l-xl pl-2">
                <HiOutlineSearch size={20}/>
            </button>

            <input 
                onKeyDown={e => handleListenKey(e)}
                onClick={handleClickInput}
                className="h-[34px] w-[279px] rounded-r-xl pl-1 outline=none placeholder:text-[16px] outline-none" 
                placeholder="Bạn cần tìm gì?"
                value={valueSearch}
                onChange={(e) => setValueSearch(e.target.value)}
            ></input>

            {valueSearch && <span onClick={() => setValueSearch('')} className="absolute right-2 cursor-pointer"><MdOutlineCancel /></span>}

            {showOverlay && 
                <div className='w-[500px] bg-white absolute top-[140%] overflow-hidden rounded-md left-0 pb-2'>
                    {!dataQuickSearch ? 
                        <div className='p-3'>
                            <div className='flex justify-between'>
                                <div className='flex items-center gap-2'>
                                    <p className='text-[16px] text-[#4A4A4A]'>Lịch sử tìm kiếm</p>
                                    <IoTimeOutline size="17px" />
                                </div>

                                <div className='flex items-center gap-2'>
                                    <button className='text-[#86888D] text-[16px] hover:underline'>Xoá tất cả</button>
                                    <GoTrash size='17px' />
                                </div>
                            </div>

                            <ul className='mt-2 flex-col flex gap-1'>
                                {dataCurrent.searcheds.map((item, index) => (
                                    <li key={index} className='text-[#86888D] text-[14px] hover:underline hover:cursor-pointer'>{item}</li>
                                ))}
                            </ul>
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