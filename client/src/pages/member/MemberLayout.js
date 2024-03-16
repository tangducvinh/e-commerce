import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

import path from '../../ultis/path'
import { profile } from '../../ultis/contants'
import { AdminSidebar } from '../../companents'
import { Header } from '../../companents'

const MenberLayout = () => {
    const { token } = useSelector(state => state.user)
    if (!token ) return <Navigate to={`/${path.ACCOUNT}/${path.LOGIN}`} replace={true} />

    return (
        <div className='relative min-h-[965px]'>
            <div className='fixed w-full z-50'>
                <Header />
            </div>

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