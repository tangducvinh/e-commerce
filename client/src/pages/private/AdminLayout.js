import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import path from '../../ultis/path'
import { AdminSidebar } from '../../companents'

const AdminLayout = () => {
    const { isLoggedIn, dataCurrent } = useSelector(state => state.user)

    console.log([isLoggedIn, dataCurrent])

    if (!isLoggedIn || !dataCurrent || dataCurrent.role !== '7') return <Navigate to={`/${path.LOGIN}`} replace={true} />

    return (
        <div className='flex justify-center'>
            <div className='w-[1220px] flex position gap-[30px]'>
                <div className='border w-[270px] fixed bg-[#F6FBFC] rounded-lg p-2'>
                    <AdminSidebar />
                </div>

                <div className='w-[270px]'></div>

                <div className='flex-1'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default AdminLayout