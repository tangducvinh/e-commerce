import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

import path from '../../ultis/path'
import { profile } from '../../ultis/contants'
import { AdminSidebar, ShowChildren } from '../../companents'
import { Header } from '../../companents'

const MenberLayout = () => {
    const { isLoggedIn, dataCurrent } = useSelector(state => state.user)
    const { children } = useSelector(state => state.app)
    if (!isLoggedIn || !dataCurrent ) return <Navigate to={`/${path.LOGIN}`} replace={true} />

    return (
        <div className='relative'>
            <div className='fixed w-full z-40'>
                <Header />
            </div>

            {children && <ShowChildren children={children}/>}

            <div className='h-[64px]'></div>

            <div className='flex justify-center'>
                <div className='w-[1220px] mt-[20px] flex gap-[30px]'>
                    <div className='border w-[270px] fixed bg-[#F6FBFC] rounded-lg p-2'>
                        <AdminSidebar data={profile} />
                    </div>

                    <div className='w-[270px]'></div>

                    <div className='flex flex-1'>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}


export default MenberLayout