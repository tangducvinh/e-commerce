import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

import path from '../../ultis/path'
import { profile } from '../../ultis/contants'
import { AdminSidebar } from '../../companents'
import { Header } from '../../companents'

const MenberLayout = () => {
    const { isLoggedIn, dataCurrent } = useSelector(state => state.user)
    if (!isLoggedIn || !dataCurrent ) return <Navigate to={`/${path.LOGIN}`} replace={true} />

    return (
        <div>
            <div>
                <Header />
            </div>

            <div className='flex justify-center'>
                <div className='w-[1220px] mt-[20px] flex gap-[30px]'>
                    <div className='border w-[270px] fixed bg-[#F6FBFC] rounded-lg p-2'>
                        <AdminSidebar data={profile} />
                    </div>

                    <div className='w-[270px]'></div>

                    <Outlet />
                </div>
            </div>
        </div>
    )
}


export default MenberLayout