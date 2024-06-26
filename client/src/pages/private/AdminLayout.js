import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import path from '../../ultis/path'
import { AdminSidebar, FormEditInfor, Header } from '../../companents'
import { appSlice } from '../../store/appSlice'
import { adminSidebar } from '../../ultis/contants'
import { withBaseCompanent } from '../../hocs/withBaseCompanent'

const AdminLayout = ({dispatch}) => {
    const { isLoggedIn, dataCurrent } = useSelector(state => state.user)
    const { showEditForm } = useSelector(state => state.app)

    // if (!isLoggedIn || !dataCurrent || dataCurrent.role !== '7') return <Navigate to={`/${path.LOGIN}`} replace={true} />
    
    return (
        <div className='relative w-full'>
            {showEditForm && 
                <div 
                    onClick={() => dispatch(appSlice.actions.setShowEditForm(false))} 
                    className='flex absolute top-0 left-0 right-0 bottom-0 bg-overlay z-10'
                >
                    <div className='flex items-center justify-center w-screen h-screen'>
                        <FormEditInfor />
                    </div>
                </div>
            }

            <div className='fixed w-full top-0 z-50'><Header /></div>

            <div className='h-[64px]'></div>

            <div className='flex justify-center items-center'>
                <div className="flex gap-[30px] mt-[20px] w-[1500px]">
                    <div className='border-[1px] border-gray-300 w-[270px] fixed bg-[#F6FBFC] z-49 rounded-lg p-2'>
                        <AdminSidebar data={adminSidebar} />
                    </div>

                    <div className='w-[270px]'></div>

                    <div className='flex-1'>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withBaseCompanent(AdminLayout)