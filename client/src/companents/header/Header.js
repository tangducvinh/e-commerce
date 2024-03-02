import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState, useRef } from 'react'
import swal from 'sweetalert'

import icons from '../../ultis/icons'
import { Button } from '../../companents'
import { Link, useNavigate } from 'react-router-dom'
import path from '../../ultis/path'
import { userSlice } from '../../store/userSlice'
import * as apis from '../../apis'

const Header = () => {
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
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { dataCurrent, isLoggedIn } = useSelector(state => state.user)
    const name = dataCurrent?.name?.split(' ')
    const [ show, setShow ] = useState(false)
    const optionElement = useRef()

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

    return (
        <div>
            <div className="h-10 bg-gray flex justify-center items-center">
                <img className="w=[340px] object-cover h-[30px] mr-[26px] ml-[26px]" alt="image1" src="https://cdn2.cellphones.com.vn/x30,webp,q100/https://dashboard.cellphones.com.vn/storage/top-banner-chinh-sach-bao-hanh-doi-tra.png"></img>
                <img className="w=[340px] object-cover h-[30px] mr-[26px] ml-[26px]" alt="image2" src="https://cdn2.cellphones.com.vn/x30,webp,q100/https://dashboard.cellphones.com.vn/storage/top-banner-chinh-hang-xuat-vat-day-du.png"></img>
                <img className="w=[340px] object-cover h-[30px] mr-[26px] ml-[26px]" alt="image3" src="https://cdn2.cellphones.com.vn/x30,webp,q100/https://dashboard.cellphones.com.vn/storage/top-banner-giao-nhanh-mien-phi.png"></img>
            </div>

            <div className="bg-main h-[64px] justify-center flex items-center">
                <div className="w-main flex items-center justify-center">
                    <Link 
                        className="flex mx-2 cursor-pointer" href="/"
                        to={`/${path.HOME}`}
                    >
                        <span className="text-white text-2xl mr-1 font-bold">Cellphone</span>
                        <img className="h-[30px] w-[30px]" alt="cellphones" src="https://cdn2.cellphones.com.vn/x/media/favicon/default/logo-cps.png"></img>
                    </Link>

                    <div className="flex items-center w-[95px] h-[42px] bg-bg-btn justify-center rounded-xl cursor-pointer">
                        <LuMenuSquare color={'white'} size={20}/>
                        <span className="ml-1 text-white text-[12px]">Danh mục</span>
                    </div>

                    <div className="w-[130px] h-[39px] flex items-center cursor-pointer text-white bg-bg-btn mx-[10px] justify-center rounded-xl">
                        <MdOutlineLocalOffer size={25}/>

                        <div className="flex flex-col px-2">
                            <span className="text-[10px]">Xem giá tại</span>
                            <span className="text-[14px]">Đà Nẵng</span>
                        </div>

                        <IoChevronDownOutline />
                    </div>

                    <button className="h-[34px] bg-white rounded-l-xl pl-2">
                        <HiOutlineSearch size={20}/>
                    </button>

                    <div className="flex relative justify-center items-center">
                        <input className="h-[34px] w-[279px] rounded-r-xl pl-1 outline=none placeholder:text-[16px] outline-none " placeholder="Bạn cần tìm gì?"></input>

                        <span className="absolute right-2 cursor-pointer"><MdOutlineCancel /></span>
                    </div>

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
                                    <Link to={dataCurrent?.role === '3' ? `/${path.MEMBER}/${path.PERSONAL}` : dataCurrent?.role === '7' && `/${path.ADMIN}/${path.PERSONAL}`} className='text-main mb-2 px-3 py-2 block w-full border border-main rounded-xl select-none'>Thông tin cá nhân</Link>
                                    {dataCurrent.role === '7' && 
                                        <Link to={`/${path.ADMIN}/${path.DASHBOARD}`} className='text-main mb-2 px-3 py-2 block w-full border border-main rounded-xl select-none'>Trang quản lí</Link>
                                    }
                                    <Link to={`/${path.LOGIN}`} onClick={handleLogout} className='text-main px-3 py-2 block w-full border border-main rounded-xl select-none'>Đăng xuất</Link>
                                </div>
                            }
                        </div>
                    : 
                        <Link to={`/${path.LOGIN}`} className="text-white bg-bg-btn rounded-xl px-2 flex flex-col items-center cursor-pointer">
                            <IoPersonCircleOutline size={25}/>
                            <span className="text-[12px] px-2 select-none">Đăng nhập</span>
                        </Link>
                    }
                </div>
            </div>
        </div>
    )
}

export default Header