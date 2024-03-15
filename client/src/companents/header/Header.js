import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState, useRef } from 'react'
import swal from 'sweetalert'

import icons from '../../ultis/icons'
import { Button, InputSearchHeader } from '../../companents'
import { Link } from 'react-router-dom'
import path from '../../ultis/path'
import { userSlice } from '../../store/userSlice'
import * as apis from '../../apis'
import { Sidebar } from '../../companents'
import { appSlice } from '../../store/appSlice'
import { withBaseCompanent } from '../../hocs/withBaseCompanent'

const Header = ({ dispatch, navigate }) => {
    const { 
        LuMenuSquare, 
        MdOutlineLocalOffer, 
        IoChevronDownOutline, 
        HiOutlineSearch, 
        MdOutlineCancel,
        FiPhone,
        TfiTruck,
        BsHandbag,
        IoPersonCircleOutline,
    } = icons   

    const { dataCurrent, isLoggedIn } = useSelector(state => state.user)
    const name = dataCurrent?.name?.split(' ')
    const [ show, setShow ] = useState(false)
    const optionElement = useRef()
    const [ showSidebar, setShowSidebar ] = useState(false)
    const parentElement = useRef()
    const { showOverlaySidebar } = useSelector(state => state.app)

    const fecthDataCurrentUser = () => {
        setTimeout(async() => {
            const response = await apis.getCurrentUser()

            if (!response?.data.success) {
                dispatch(userSlice.actions.logout())
                swal('Oops', 'Phiên đăng nhập đã hết hạn vui lòng thực hiện đăng nhập lại', 'error').then(() => {
                    navigate(`/${path.LOGIN}`)
                })
            } else {
                dispatch(userSlice.actions.setDataUserCurrent(response.data.rs))
            }
        }, 2000)
    }

    useEffect(() => {
        if (isLoggedIn) {
            fecthDataCurrentUser()
        }
    }, [isLoggedIn])

    const handleLogout = () => {
        dispatch(userSlice.actions.logout())
    }

    useEffect(() => {
        const handleHiddenOption = (e) => {
            const result = optionElement.current?.contains(e.target)
            if (!result) {
                setShow(false)
            }
        }

        document.addEventListener('click', handleHiddenOption)

        return () => document.removeEventListener('click', handleHiddenOption)
    }, [])

    const handleSetSibar = () => {
        setShowSidebar(prev => !prev)
        console.log('hello')
        dispatch(appSlice.actions.setShowOverlay(true))
    }

    useEffect(() => {
        const handleHiddenInforSearch = (e) => {
            const result = parentElement.current.contains(e.target)

            if (!result) {
                dispatch(appSlice.actions.setShowOverlaySidebar(false))
            } else {
                dispatch(appSlice.actions.setShowOverlaySidebar(true))
            }
        }

        document.addEventListener('click', handleHiddenInforSearch)

        return () => document.removeEventListener('click', handleHiddenInforSearch)
    }, [])


    return (
        <div>
            {/* <div className="h-10 bg-gray flex justify-center items-center">
                <img className="w=[340px] object-cover h-[30px] mr-[26px] ml-[26px]" alt="image1" src="https://cdn2.cellphones.com.vn/x30,webp,q100/https://dashboard.cellphones.com.vn/storage/top-banner-chinh-sach-bao-hanh-doi-tra.png"></img>
                <img className="w=[340px] object-cover h-[30px] mr-[26px] ml-[26px]" alt="image2" src="https://cdn2.cellphones.com.vn/x30,webp,q100/https://dashboard.cellphones.com.vn/storage/top-banner-chinh-hang-xuat-vat-day-du.png"></img>
                <img className="w=[340px] object-cover h-[30px] mr-[26px] ml-[26px]" alt="image3" src="https://cdn2.cellphones.com.vn/x30,webp,q100/https://dashboard.cellphones.com.vn/storage/top-banner-giao-nhanh-mien-phi.png"></img>
            </div> */}

            <div className="bg-main h-[64px] justify-center flex items-center">
                <div className="w-main flex items-center justify-center">
                    <Link 
                        className="flex mx-2 cursor-pointer" href="/"
                        to={`/${path.HOME}`}
                    >
                        <span className="text-white text-2xl mr-1 font-bold">Cellphone</span>
                        <img className="h-[30px] w-[30px]" alt="cellphones" src="https://cdn2.cellphones.com.vn/x/media/favicon/default/logo-cps.png"></img>
                    </Link>

                    <div 
                        ref={parentElement}
                        className="flex items-center w-[95px] h-[42px] relative bg-bg-btn justify-center rounded-xl cursor-pointer"
                    >
                        <LuMenuSquare color={'white'} size={20}/>
                        <span className="ml-1 text-white text-[12px] select-none">Danh mục</span>

                        {showOverlaySidebar && 
                            <div className='absolute top-[150%] bg-white rounded-lg shadow-md right-[125%] pb-2 w-[220px]'>
                                <Sidebar />
                            </div>
                        }
                    </div>

                    <div className="w-[130px] h-[39px] flex items-center cursor-pointer text-white bg-bg-btn mx-[10px] justify-center rounded-xl">
                        <MdOutlineLocalOffer size={25}/>

                        <div className="flex flex-col px-2">
                            <span className="text-[10px]">Xem giá tại</span>
                            <span className="text-[14px]">Đà Nẵng</span>
                        </div>

                        <IoChevronDownOutline />
                    </div>

                    <InputSearchHeader />

                    <div className="flex gap-1 mx-1">
                        <Button icon={<FiPhone size={25} />} text1={'Gọi mua hàng'} text2={'1800.7777'}></Button>
                        <Button icon={<TfiTruck size={25} />} text1={'Cửa hàng'} text2={'gần bạn'}></Button>
                        <Button icon={<BsHandbag size={28} />} path={`/${path.MEMBER}/${path.MYCART}`} text1={'Giỏ'} amount={dataCurrent?.cart?.reduce((total, current) => total + current.quanlity, 0) || 0} text2={'hàng'}></Button>
                    </div>

                    {isLoggedIn ? 
                        <div 
                            ref={optionElement}
                            onClick={(e) => setShow(prev => !prev)}
                            className="text-white bg-bg-btn rounded-xl px-2 flex flex-col items-center cursor-pointer relative"
                        >
                            <IoPersonCircleOutline size={25}/>
                            <span className="text-[12px] px-2 select-none">{name && name[name.length - 1]}</span>

                            {show && 
                                <div className='w-[250px] bg-white z-50 absolute right-0 rounded-md shadow-xl top-[130%] p-2'>
                                    <Link to={`/${path.MEMBER}/${path.PERSONAL}`} className='text-main mb-2 px-3 py-2 block w-full border border-main rounded-xl select-none'>Thông tin cá nhân</Link>
                                    {dataCurrent?.role === '7' && 
                                        <Link to={`/${path.ADMIN}/${path.DASHBOARD}`} className='text-main mb-2 px-3 py-2 block w-full border border-main rounded-xl select-none'>Trang quản lí</Link>
                                    }
                                    <Link to={`/${path.ACCOUNT}/${path.LOGIN}`} onClick={handleLogout} className='text-main px-3 py-2 block w-full border border-main rounded-xl select-none'>Đăng xuất</Link>
                                </div>
                            }
                        </div>
                    : 
                        <Link 
                            to={`/${path.ACCOUNT}/${path.LOGIN}`} 
                            className="text-white bg-bg-btn rounded-xl px-2 flex flex-col items-center cursor-pointer">
                            <IoPersonCircleOutline size={25}/>
                            <span className="text-[12px] px-2 select-none">Đăng nhập</span>
                        </Link>
                    }
                </div>
            </div>
        </div>
    )
}

export default withBaseCompanent(Header)